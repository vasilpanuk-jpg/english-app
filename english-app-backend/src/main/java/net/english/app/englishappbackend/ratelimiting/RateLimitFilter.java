package net.english.app.englishappbackend.ratelimiting;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.ConsumptionProbe;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;

@RequiredArgsConstructor
@Component
public class RateLimitFilter extends OncePerRequestFilter {


    private final LettuceBasedProxyManager<String> proxyManager;

    private final BucketConfiguration limitConfig = BucketConfiguration.builder()
            .addLimit(limit -> limit.capacity(100).refillGreedy(100, Duration.ofMinutes(1)))
            .build();

    private String resolveKey(HttpServletRequest request) {
        String clientId = request.getRemoteAddr();
        String path = request.getRequestURI();
        return clientId + ":" + path;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String key = resolveKey(request);

        Bucket bucket = proxyManager.builder().build(key, limitConfig);
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

        if (probe.isConsumed()) {
            response.addHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.addHeader("X-Rate-Limit-Retry-After-Seconds",
                    String.valueOf(probe.getNanosToWaitForRefill() / 1_000_000_000));
            response.getWriter().write("Too many requests");
        }
    }
}
