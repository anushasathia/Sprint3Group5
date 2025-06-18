package com.nisum.group5.repository;


import com.nisum.group5.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress,Integer> {
}
