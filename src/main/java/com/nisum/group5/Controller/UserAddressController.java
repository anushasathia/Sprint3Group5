package com.nisum.group5.Controller;

import com.nisum.group5.Service.UserAddressService;
import com.nisum.group5.model.UserAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/useraddress")
public class UserAddressController {

    private final UserAddressService userAddressService;

    @Autowired
    public UserAddressController(UserAddressService userAddressService) {
        this.userAddressService = userAddressService;
    }

    @GetMapping
    public List<UserAddress> getAllUserAddresses() {
        return userAddressService.getAllUserAddresses();
    }

    @PostMapping
    public ResponseEntity<String> insertUserAddress(@RequestBody UserAddress userAddress) {
        userAddressService.addUserAddress(userAddress);
        return ResponseEntity.ok("User address saved successfully");
    }

    @GetMapping("/{id}")
    public List<UserAddress> getUserAddressById(@PathVariable Integer id) {
        return userAddressService.getUserAddressById(id);
    }
}
