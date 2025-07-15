package TFM.VulnerableWebApp.fileUpload;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequiredArgsConstructor
public class FileUploadController {

    @Autowired
    private final FileUploadService storageService;
    
    @PostMapping("api/fileUpload")
    public ResponseEntity<String> uploadFile(@RequestBody MultipartFile file) {
        System.out.println("Received file: " + file);
        String message = "";
        try {
            storageService.saveFile(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.SC_OK).body(message);
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body(message);
        }    
    }
    
}
