package TFG.GameVault.user;


import org.springframework.web.bind.annotation.RestController;

import TFG.GameVault.DTOs.CredentialsDto;
import TFG.GameVault.DTOs.SignUpDto;
import TFG.GameVault.DTOs.UserDto;
import TFG.GameVault.config.UserAuthenticationProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService us;
    
    private final UserAuthenticationProvider userAuthenticationProvider = new UserAuthenticationProvider();

        @PostMapping("/login")
        public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
            UserDto userDto = us.login(credentialsDto);
            userDto.setToken(userAuthenticationProvider.createToken(userDto.getUsername()));
            return ResponseEntity.ok(userDto);
        }

        @PostMapping("/register")
        public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
            UserDto createdUser = us.register(user);
            createdUser.setToken(userAuthenticationProvider.createToken(user.getUsername()));
            return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
        }
    
}
