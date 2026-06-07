package net.english.app.englishappbackend.ratelimiting;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import lombok.RequiredArgsConstructor;
import net.english.app.englishappbackend.exceptions.RateLimitExceededException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.time.Duration;
import java.util.Objects;

@Aspect
@Component
@RequiredArgsConstructor
public class RateLimitAspect {

    private final LettuceBasedProxyManager<String> proxyManager;
    private final ExpressionParser parser = new SpelExpressionParser();

    @Around("@annotation(rateLimit)")
    public Object checkRateLimit(ProceedingJoinPoint joinPoint, RateLimit rateLimit) throws Throwable {

        // String key = rateLimit.key().isEmpty() ? "default" + rateLimit.requests() :
        // rateLimit.key();

        String dynamicKey = resolveKey(joinPoint, rateLimit.key());

        BucketConfiguration config = BucketConfiguration.builder()
                .addLimit(limit -> limit
                        .capacity(rateLimit.requests())
                        .refillGreedy(rateLimit.requests(), Duration.ofSeconds(rateLimit.durationSeconds())))
                .build();

        Bucket bucket = proxyManager.builder().build(dynamicKey, config);

        if (bucket.tryConsume(1)) {
            return joinPoint.proceed();
        } else {
            throw new RateLimitExceededException("Rate limit exceeded for key: " + dynamicKey);
        }
    }

    private String resolveKey(ProceedingJoinPoint joinPoint, String keyExpression) {
        if (!keyExpression.contains("${")) {
            return keyExpression;
        }

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        Object[] args = joinPoint.getArgs();
        Parameter[] parameters = method.getParameters();

        StandardEvaluationContext context = new StandardEvaluationContext();

        for (int i = 0; i < parameters.length; i++) {
            String paramName = parameters[i].getName();
            Object paramValue = args[i];
            context.setVariable(paramName, paramValue);

            context.setVariable("arg" + i, paramValue);
        }

        String spelExpression = extractSpelExpression(keyExpression);
        Object resolved = parser.parseExpression(spelExpression).getValue(context);

        return keyExpression.replace("${" + spelExpression + "}", Objects.toString(resolved, ""));
    }

    private String extractSpelExpression(String keyExpression) {
        int start = keyExpression.indexOf("${");
        int end = keyExpression.indexOf("}");
        if (start != -1 && end != -1) {
            return keyExpression.substring(start + 2, end);
        }

        return keyExpression;
    }

}
