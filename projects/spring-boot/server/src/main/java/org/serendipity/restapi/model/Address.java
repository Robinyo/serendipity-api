package org.serendipity.restapi.model;

import javax.persistence.Entity;
// import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Address {
  
  @Id
  private long id;
  
  // @OneToOne(fetch = FetchType.LAZY)
  @OneToOne
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
  
  @Override
  public boolean equals(Object o) {

    if (this == o)
      return true;

    if (!(o instanceof Address))
      return false;

    Address other = (Address) o;

    return id != 0L && id == other.getId();
  }

  @Override
  public int hashCode() {
    return 31;
  }  

}
