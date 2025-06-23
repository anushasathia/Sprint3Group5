package com.nisum.group5.Service;

import com.nisum.group5.model.ShoppingCart;
import com.nisum.group5.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;


    @Autowired
    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository) {
        this.shoppingCartRepository = shoppingCartRepository;

    }

    public List<ShoppingCart> getCartItemsByCartId(Integer cartId) {
        return shoppingCartRepository.findByProductId(cartId);
    }

    public void addItemToCart(ShoppingCart cartItem) {
        shoppingCartRepository.save(cartItem);
    }

    public List<ShoppingCart> getALlShoppingCartItems(){
        return shoppingCartRepository.findAll();
    }

    public void deleteAllCartItems(){
        shoppingCartRepository.deleteAll();
    }

    public double getFinalPrice(){
        return shoppingCartRepository.findAll().stream().mapToDouble(ShoppingCart::getPrice).sum();
    }

}
