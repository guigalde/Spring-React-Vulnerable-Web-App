package TFM.VulnerableWebApp.sqlInjection;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SQLInjectionController {
    
    @Autowired
    public SQLInjectionService sqlInjectionService;

    @GetMapping(value="api/sqlInjection", params = {"objectName"})
    public ResponseEntity<List<List<Map<String, Object>>>> listElements(@RequestParam String objectName) {
        try {
            List<List<Map<String, Object>>> result = sqlInjectionService.listElements(objectName);
            return ResponseEntity.ok(result);
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
