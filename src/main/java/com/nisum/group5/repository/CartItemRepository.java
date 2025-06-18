package com.nisum.group5.repository;

import com.nisum.group5.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByCartItemId(Integer cartItemId);

    void deleteByCartItemId(Integer cartItemId);
}
