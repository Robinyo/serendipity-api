package org.serendipity.restapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Party")
public class Party {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;
  
  private String type;            // 'Individual' | 'Organisation'
  
  private String displayName;
  
}

/*

import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "Party")
public class Party {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  
  private String type;          // 'Individual' | 'Organisation'
  
  private String displayName;
  
}

// import lombok.NoArgsConstructor;

@NoArgsConstructor

*/
