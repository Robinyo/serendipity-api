package org.serendipity.restapi.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(indexes = { @Index(name = "FAMILY_NAME_INDEX", columnList = "familyName", unique = false) })
public class IndividualName {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "individualId", nullable = false)
  private Individual individual;

  // @Embedded
  // private Name name;

  @Column(name = "type", nullable = false)
  private String type;

  private String title;         // name prefix

  private String givenName;

  private String preferredGivenName;

  private String middleName;    // otherNames

  private String initials;

  @Column(name = "familyName", nullable = false)
  private String familyName;

  private String preferredFamilyName;

  private String preferredName; // informalSalutation

  private String honorific;     // name suffix

  private String salutation;    // formalSalutation

  @Temporal(TemporalType.TIMESTAMP)
  private Date fromDate;

  @Temporal(TemporalType.TIMESTAMP)
  private Date toDate;

}

/*

  @Builder.Default
  private String type = "";     // usageType: Legal Name

  private String title;         // name prefix

  private String givenName;

  private String middleName;    // otherNames

  @Column(name = "familyName", nullable = false)
  private String familyName;

  private String honorific;

  private String salutation;    // formalSalutation

  private String preferredName; // informalSalutation

  private String initials;

*/
