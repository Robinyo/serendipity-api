package org.serendipity.restapi.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//
// A surrogate key is any column or set of columns that can be declared as the primary key instead of a "real" or
// natural key. Sometimes there can be several natural keys that could be declared as the primary key, and these
// are all called candidate keys. So a surrogate is a candidate key.
//

@Embeddable
public class SurrogateKey {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;
  
  //
  // MongoDB
  //
  // private String id;

}
