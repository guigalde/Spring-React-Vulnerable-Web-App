package TFM.VulnerableWebApp.user;


import org.springframework.web.bind.annotation.RestController;

import TFM.VulnerableWebApp.DTOs.CredentialsDto;
import TFM.VulnerableWebApp.DTOs.SignUpDto;
import TFM.VulnerableWebApp.DTOs.UserDto;
import TFM.VulnerableWebApp.config.UserAuthenticationProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService us;
    
    @Autowired
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("api/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        try{
            UserDto userDto = us.login(credentialsDto);
            userDto.setToken(userAuthenticationProvider.createToken(userDto));
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("api/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        try{
            UserDto createdUser = us.register(user);
            createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
            return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("api/changePassword")
    public ResponseEntity<UserDto> changePassword(@RequestBody @Valid CredentialsDto credentialsDto) {
        try{
            UserDto userDto = us.updateUser(credentialsDto);
            userDto.setToken(userAuthenticationProvider.createToken(userDto));
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    
}
