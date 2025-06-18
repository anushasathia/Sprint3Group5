package com.nisum.group5.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.util.Date;

@Entity
public class ShoppingCart {


    @Column(name = "cartTotal")
    private double cartTotal;

    @Column(name = "createdDate")
    private Date createdDate;

    @Column(name = "lastUpdatedDate")
    private Date lastUpdatedDate;


    public double getCartTotal() {
        return cartTotal;
    }

    public void setCartTotal(double cartTotal) {
        this.cartTotal = cartTotal;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getLastUpdatedDate() {
        return lastUpdatedDate;
    }

    public void setLastUpdatedDate(Date lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
    }
}
