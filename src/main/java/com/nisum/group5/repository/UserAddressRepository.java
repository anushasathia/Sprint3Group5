package com.nisum.group5.repository;

import com.nisum.group5.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Integer> {

    List<UserAddress> findByAddressId(Integer addressId);

    void deleteByAddressId(Integer addressId);
}
