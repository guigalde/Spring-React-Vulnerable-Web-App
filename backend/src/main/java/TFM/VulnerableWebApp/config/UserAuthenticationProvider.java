package TFM.VulnerableWebApp.config;

import java.security.Key;
import java.util.Collections;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;



import TFM.VulnerableWebApp.DTOs.UserDto;
import TFM.VulnerableWebApp.user.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Data;

@Data
@Configuration
public class UserAuthenticationProvider {


    @Autowired
    UserService us;
    
    @Value("${jwt.token.secret: swi6+wiYHsvc2gvIQl/K/hBtZXMverSDur9wQ6bAAGM1H5MvVXINcz+U52L1bJgZ}")
    private String secretKey;

    @Bean
	static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(UserDto user){
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        claims.put("role", user.getRole());
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());

        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000*24);
        return Jwts.builder()
                .setClaims(claims)
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
