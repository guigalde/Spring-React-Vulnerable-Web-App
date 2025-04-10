package TFM.VulnerableWebApp.user;

import TFM.VulnerableWebApp.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Entity
@Data
@Table(name="roles")
public class Role extends BaseEntity{

    @NotBlank
    @Enumerated(EnumType.STRING)
    public ERole roleName;
    
}
