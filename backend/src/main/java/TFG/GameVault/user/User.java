package TFG.GameVault.user;

import org.checkerframework.common.aliasing.qual.Unique;

import TFG.GameVault.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class User extends BaseEntity{

    @Unique
    @NotBlank
    public String username;

    @NotBlank
    public String password;

    @NotBlank
    @Email
    public String email;

    @ManyToOne
    @NotNull
    public Role role;
    
}
