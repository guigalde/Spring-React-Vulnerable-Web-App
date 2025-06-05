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
            
            ProcessBuilder process = new ProcessBuilder();
            String[] commandList = command.split(" ");
            
            if( System.getProperty("user.dir").equals("C:\\Users\\Guille\\Desktop\\TFM\\SpringAndReact_VulnerableApp\\backend")){
                String[] cmdList = new String[] {"cmd.exe", "/c", "type"};
                String[] fullCommand = Stream.concat(Arrays.stream(cmdList), Arrays.stream(commandList))
                .toArray(String[]::new);
                for(String s : fullCommand){
                    System.out.println(s);
                }
                process = new ProcessBuilder(fullCommand);
            }else{
                String[] cmdList = new String[] {"cmd.exe", "/c", "cd", "backend", "&&", "type"};
                String[] fullCommand = Stream.concat(Arrays.stream(cmdList), Arrays.stream(commandList))
                .toArray(String[]::new);
                System.out.println(fullCommand);
                process = new ProcessBuilder(fullCommand);
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
