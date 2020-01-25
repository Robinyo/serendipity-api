package org.serendipity.restapi.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import lombok.Builder;
import lombok.Data;

import org.serendipity.restapi.model.Location;

@Builder
@Data
@Entity
public class Address {
  
  @Id
  private long id;
  
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "locationId")
  @MapsId
  private Location location;
  
  private String name;
  
  private String line1;
  
  private String line2;
  
  private String city;
  
  private String state;
  
  private String postalCode;
  
  private String country;
  
  private String addressType;

}
