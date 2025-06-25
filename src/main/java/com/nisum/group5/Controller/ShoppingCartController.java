package com.nisum.group5.Controller;

import com.nisum.group5.Service.ShoppingCartService;
import com.nisum.group5.model.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping
    public List<ShoppingCart> getAllShoppingCart() {
        return shoppingCartService.getALlShoppingCartItems();
    }

    @PostMapping
    public ResponseEntity<String> insertItems(@RequestBody ShoppingCart shoppingCart) {
        shoppingCartService.addItemToCart(shoppingCart);
        return ResponseEntity.ok("DOne");
    }

    @DeleteMapping
    public void deleteItesm(){
        shoppingCartService.deleteAllCartItems();
    }

    @GetMapping("/TotalPrice")
    public double getTotalPrice(){
        return shoppingCartService.getFinalPrice();
    }
}
