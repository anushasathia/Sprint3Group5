package com.nisum.group5.Service;

import com.nisum.group5.model.UserAddress;
import com.nisum.group5.repository.UserAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAddressService {

    private final UserAddressRepository userAddressRepository;

    @Autowired
    public UserAddressService(UserAddressRepository userAddressRepository) {
        this.userAddressRepository = userAddressRepository;
    }

    public List<UserAddress> getAllUserAddresses() {
        return userAddressRepository.findAll();
    }

    public void addUserAddress(UserAddress userAddress) {
        userAddressRepository.save(userAddress);
    }

    public List<UserAddress> getUserAddressById(Integer addressId) {
        return userAddressRepository.findByAddressId(addressId);
    }
}
