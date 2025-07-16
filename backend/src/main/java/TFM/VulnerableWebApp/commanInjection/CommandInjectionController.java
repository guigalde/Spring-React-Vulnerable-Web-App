package TFM.VulnerableWebApp.commanInjection;

import org.springframework.web.bind.annotation.RestController;
import org.yaml.snakeyaml.util.ArrayUtils;

import lombok.RequiredArgsConstructor;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
public class CommandInjectionController {
    
    @GetMapping(value="api/commandInjection", params = {"command"})
    public ResponseEntity<String> getExampleFile(@RequestParam String command) {
        try{
            String os = System.getProperty("os.name").toLowerCase();
            ProcessBuilder process = new ProcessBuilder();
            String[] commandList = command.split(" ");
            if(os.contains("linux")){
                if( System.getProperty("user.dir").contains("\\backend") || System.getProperty("user.dir").contains("/app")){
                    String[] cmdList = new String[] {"/bin/sh", "-c","cd uploads && cat "+command };
                    
                    process = new ProcessBuilder(cmdList);
                }else{
                    String[] cmdList = new String[] {"/bin/sh", "-c", "pwd && cd backend/uploads && cat "+command};
                    
                    process = new ProcessBuilder(cmdList);
                }
            }else if(os.contains("win")){
                System.out.println("Windows command");
                if( System.getProperty("user.dir").contains("\\backend")){
                    String[] cmdList = new String[] {"cmd.exe","/c","cd", "uploads", "&&", "type"};
                    String[] fullCommand = Stream.concat(Arrays.stream(cmdList), Arrays.stream(commandList))
                    .toArray(String[]::new);
                    for(String s : fullCommand){
                        System.out.println(s);
                    }
                    process = new ProcessBuilder(fullCommand);
                }else{
                    String[] cmdList = new String[] {"cmd.exe", "/c", "cd", "backend/uploads", "&&", "type"};
                    String[] fullCommand = Stream.concat(Arrays.stream(cmdList), Arrays.stream(commandList))
                    .toArray(String[]::new);
                    System.out.println(fullCommand);
                    process = new ProcessBuilder(fullCommand);
                }
            }else{
                System.out.println("Unknown OS");
            }
            process.redirectErrorStream(true);
            Process p = process.start();
            BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String output = "";
            String line;
            while (true) {
                line = r.readLine();
                output += line + "\n";
                if (line == null) { break; }
                System.out.println(line);
            }

            return ResponseEntity.ok(output);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error executing command: " + e.getMessage());
        }

        
    }
    

}
