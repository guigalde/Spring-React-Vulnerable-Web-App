package TFM.VulnerableWebApp.sqlInjection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SQLInjectionService {
    

    @Autowired
    private final DataSource dataSource;

    @Transactional
    public List<List<Map<String, Object>>> listElements(String objectName) throws SQLException {
        List<List<Map<String, Object>>> allResults = new ArrayList<>();

        String query = "SELECT * FROM "+ objectName;
        
        Connection c = dataSource.getConnection();

        Statement stmt = c.createStatement();
        boolean hasResults = stmt.execute(query);
        
        int resultSetCount = 0;
        do {
            if (hasResults) {
                ResultSet rs = stmt.getResultSet();
                List<Map<String, Object>> currentResult = new ArrayList<>();
                
                // Get metadata for dynamic column reading
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();
                
                while (rs.next()) {
                    Map<String, Object> row = new HashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object value = rs.getObject(i);
                        row.put(columnName, value);
                    }
                    currentResult.add(row);
                }
                
                allResults.add(currentResult);
                resultSetCount++;
            } else {
                // This was an UPDATE, INSERT, DELETE, etc.
                int updateCount = stmt.getUpdateCount();
                if (updateCount >= 0) {
                    Map<String, Object> updateResult = new HashMap<>();
                    updateResult.put("update_count", updateCount);
                    updateResult.put("type", "update");
                    allResults.add(List.of(updateResult));
                }
            }
            
            hasResults = stmt.getMoreResults();
        } while (hasResults || stmt.getUpdateCount() != -1);
        
        
        // ResultSet rs = c.createStatement().executeQuery(query);

        // ResultSetMetaData metaData = rs.getMetaData();
        // int columnCount = metaData.getColumnCount();
        
        // List<String> columnNames = new ArrayList<>();
        // for (int i = 1; i <= columnCount; i++) {
        //     columnNames.add(metaData.getColumnName(i));
        // }
        
        // List<Map<String, Object>> rows = new ArrayList<>();
        // while (rs.next()) {
        //     Map<String, Object> row = new HashMap<>();
        //     for (int i = 1; i <= columnCount; i++) {
        //         String columnName = metaData.getColumnName(i);
        //         Object value = rs.getObject(i);
        //         row.put(columnName, value);
        //     }
        //     rows.add(row);
        // }
        
        return allResults;
    }
}
