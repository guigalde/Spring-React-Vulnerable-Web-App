package TFG.GameVault.config;

import java.security.Key;
import java.util.Collections;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;



import TFG.GameVault.DTOs.UserDto;
import TFG.GameVault.user.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
@PropertySource("classpath:application.properties")
public class UserAuthenticationProvider {


    @Autowired
    UserService us;
    
    @Value("${jwt.token.secret: swi6+wiYHsvc2gvIQl/K/hBtZXMverSDur9wQ6bAAGM1H5MvVXINcz+U52L1bJgZ}")
    private String secretKey;

    @Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode("swi6+wiYHsvc2gvIQl/K/hBtZXMverSDur9wQ6bAAGM1H5MvVXINcz+U52L1bJgZ}");
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(String username){
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000*4);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(getSigningKey()).compact();
    }


    public Authentication validateToken(String token){
        Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
        String username = claims.getBody().getSubject();

        UserDto user = us.toUserDto(us.findByUsername(username));

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}
