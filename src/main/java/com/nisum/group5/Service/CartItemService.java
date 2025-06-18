package com.nisum.group5.Service;

import com.nisum.group5.model.CartItem;
import com.nisum.group5.repository.CartItemRepository;
import com.nisum.group5.repository.ProdutRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class CartItemService {

    private CartItemRepository cartItemRepository;
    private ProdutRepository produtRepository;


    public CartItem getCartItems(Integer cartId){
        return (CartItem) cartItemRepository.findByCartId(cartId);
    }

    public void addItemToCart(CartItem cartItem){
        cartItemRepository.save(cartItem);
    }

    public void updateItemQuantity(Integer cartId ,Integer cartItemId, Integer quantity){
        cartItemRepository.findByCartId(cartId).stream().filter(cartItem -> cartItem.getCartItemId().equals(cartItemId))
                .findFirst().ifPresent(cartItem -> { cartItem.setQuantity(quantity);
                cartItemRepository.save(cartItem);}
                );

    }

    public void removeItemByCardItemId(Integer cartItemId) {
        cartItemRepository.deleteByCartId(cartItemId);
    }

    public void clearCart(){
        cartItemRepository.deleteAll();
    }

    public double calculateCartTotal(){
        return cartItemRepository.findAll().stream().mapToDouble(CartItem::getFinalPrice).sum();
    }

    public List<CartItem> getCartItemList(){
        return cartItemRepository.findAll();
    }
}











