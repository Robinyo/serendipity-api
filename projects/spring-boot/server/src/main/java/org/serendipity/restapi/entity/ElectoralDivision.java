package org.serendipity.restapi.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class ElectoralDivision {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  private String nameDerivation;

  private String state;

  private String area;

  private String locationDescription;

  @Temporal(TemporalType.DATE)
  private Date dateGazetted;

  private String latitude;

  private String longitude;

}
