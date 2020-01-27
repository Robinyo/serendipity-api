package org.serendipity.restapi.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import static javax.persistence.TemporalType.TIMESTAMP;

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
@EntityListeners(AuditingEntityListener.class)
public class Location {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private long id;

  @Builder.Default
  private String type = "Location"; 

  @Builder.Default
  private String displayName = "";
  
  @Temporal(TIMESTAMP)
  private Date fromDate;
  
  @Temporal(TIMESTAMP)
  private Date toDate;
 
  
  //
  // @Embedded
  // private Auditable audit;
  //
  
  @CreatedBy
  private String createdBy;

  @CreatedDate
  @Temporal(TIMESTAMP)
  private Date createdAt;

  @LastModifiedBy
  private String updatedBy;
  
  @LastModifiedDate
  @Temporal(TIMESTAMP)
  private Date updatedAt;
  
  @Override
  public boolean equals(Object o) {

    if (this == o)
      return true;

    if (!(o instanceof Location))
      return false;

    Location other = (Location) o;

    return id != 0L && id == other.getId();
  }

  @Override
  public int hashCode() {
    return 31;
  }

}

// type = "Address" | "Natural Area" | "Management Zone"

/*

  @Embedded
  private SurrogateKey surrogateKey;
  
  public Location(String type) {
    this.type = type != null ? type : "Location" ;
  }

*/