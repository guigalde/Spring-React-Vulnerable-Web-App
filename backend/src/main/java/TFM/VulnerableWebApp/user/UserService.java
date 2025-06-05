package TFM.VulnerableWebApp.user;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import TFM.VulnerableWebApp.DTOs.CredentialsDto;
import TFM.VulnerableWebApp.DTOs.SignUpDto;
import TFM.VulnerableWebApp.DTOs.UserDto;
import TFM.VulnerableWebApp.exceptions.AppException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository ur;
    @Autowired
    private RoleRepository rr;

    public final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<User> findAllUsers(){
        return (List<User>) ur.findAll();
    }

    @Transactional
    public void saveUser(User user){
        ur.save(user);
    }

    @Transactional
    public void deleteUser(User user){
        ur.delete(user);
    }

    
    @Transactional(readOnly = true)
    public User findByUsername(String username){
        User user = ur.findByUsername(username).orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return user;
    }

    public UserDto findByUsernameDto(String username) {
        User user = findByUsername(username);
        return toUserDto(user);
    }

    public UserDto toUserDto(User user){

        UserDto userDto = new UserDto(user.getId(),user.getUsername(),user.getEmail(), user.getRole().getRoleName().toString(), null);
        return userDto;
    }

    public User fromRegisterToUser(SignUpDto signup){

        Optional<Role> role = rr.findById(2);
        User user = new User(signup.getUsername(), passwordEncoder.encode(CharBuffer.wrap(signup.getPassword())), signup.getEmail(), role.get());
        return user;
    }

    public UserDto login(CredentialsDto credentialsDto){
        User user = ur.findByUsername(credentialsDto.getUsername())
            .orElseThrow(()-> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())){
            return toUserDto(user);
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto signup){
        
        Optional<User> optionalUser = ur.findByUsername(signup.getUsername());
        if(optionalUser.isPresent()){
            throw new AppException("User already exists", HttpStatus.BAD_REQUEST);
        }

        User user = fromRegisterToUser(signup);

        User savedUser = ur.save(user);

        return toUserDto(savedUser);
    }

    public UserDto updateUser(String username, String oldPassword, String newPassword) {
        User existingUser = findByUsername(username);
        if(passwordEncoder.matches(CharBuffer.wrap(oldPassword), existingUser.getPassword())) {
            existingUser.setPassword(passwordEncoder.encode(CharBuffer.wrap(newPassword)));
            ur.save(existingUser);
            return toUserDto(existingUser);
        }
        else {
            throw new AppException("Invalid credentials", HttpStatus.BAD_REQUEST);
        }
    }
}
