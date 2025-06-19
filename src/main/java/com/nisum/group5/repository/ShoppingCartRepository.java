package com.nisum.group5.repository;

import com.nisum.group5.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart,Integer> {

    List<ShoppingCart> findByProductId(Integer productId);

    void deleteByProductId(Integer productId);
}
