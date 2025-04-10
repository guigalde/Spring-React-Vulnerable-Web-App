package TFM.VulnerableWebApp.user;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class RoleService {
    private RoleRepository rr;

    @Transactional(readOnly=true)
    public  List<Role> findAll(){
        return (List<Role>) rr.findAll();
    }
    @Transactional(readOnly = true)
    public Optional<Role> findById(Integer id){
        return rr.findById(id);
    }
}
