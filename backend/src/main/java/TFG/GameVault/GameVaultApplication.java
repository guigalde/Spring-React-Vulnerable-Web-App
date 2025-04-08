package TFG.GameVault;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;


@SpringBootApplication
public class GameVaultApplication {

	public static void main(String[] args) {
		SpringApplication.run(GameVaultApplication.class, args);
	}
	@Bean
    public ApplicationListener<ContextRefreshedEvent> loadData(DataSource dataSource) {
        return event -> {
            try (Connection connection = dataSource.getConnection()) {
                ScriptUtils.executeSqlScript(connection, new ClassPathResource("db/data.sql"));
            } catch (Exception e) {
                // Handle exception
            }
        };
    }
}
