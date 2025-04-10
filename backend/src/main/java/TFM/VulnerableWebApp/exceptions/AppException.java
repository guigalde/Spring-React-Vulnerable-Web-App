package TFM.VulnerableWebApp.exceptions;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException{

    private final HttpStatus code;

    public AppException(String message, HttpStatus code){
        super(message);
        this.code = code;
    }
    
}
