package net.english.app.englishappbackend.ratelimiting;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.codec.ByteArrayCodec;
import io.lettuce.core.codec.RedisCodec;
import io.lettuce.core.codec.StringCodec;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

@Configuration
public class RedisConfig {

    @Bean
    public RedisClient redisClient() {
        return RedisClient.create("redis://localhost:6379");
    }

    @Bean
    public LettuceBasedProxyManager<String> bucket4jProxyManager(RedisClient redisClient) {
        StatefulRedisConnection<String, byte[]> redisConnection = redisClient
                .connect(RedisCodec.of(StringCodec.UTF8, ByteArrayCodec.INSTANCE));

        return LettuceBasedProxyManager.builderFor(redisConnection).build();
    }

    // @Bean
    // public StatefulRedisConnection<String, byte[]> redisConnection(
    // RedisClient redisClient
    // ) {
    // return redisClient.connect(
    // RedisCodec.of(
    // StringCodec.UTF8,
    // ByteArrayCodec.INSTANCE
    // )
    // );
    // }

}
