package org.serendipity.restapi.database.seed.au;

import lombok.extern.slf4j.Slf4j;
import org.serendipity.restapi.entity.*;
import org.serendipity.restapi.repository.*;
import org.serendipity.restapi.type.LocationType;
import org.serendipity.restapi.type.PartyType;
import org.serendipity.restapi.type.au.IndividualNameType;
import org.serendipity.restapi.type.au.LegalType;
import org.serendipity.restapi.type.au.Sex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.HashSet;

@Component
@Slf4j
@Order(2)
public class AustralianGreens implements CommandLineRunner {

  @Autowired
  private AddressRepository addressRepository;

  @Autowired
  private IndividualRepository individualRepository;

  @Autowired
  private IndividualNameRepository individualNameRepository;

  @Autowired
  private OrganisationRepository organisationRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Override
  @Transactional
  public void run(String... args) throws Exception {

    log.info("Create {} ...", PoliticalParty.AUSTRALIAN_GREENS.toString());

    try {

      //
      // Head Office Address
      //

      // Timestamp currentTime = new Timestamp(System.currentTimeMillis());

      Location location = Location.builder()
        .type(LocationType.ADDRESS)
        .displayName("23/85 Northbourne Ave Turner ACT 2612")
        // .fromDate(currentTime)
        .build();

      Address headOffice = Address.builder()
        .location(location)
        .name("")
        .line1("23/85 Northbourne Ave")
        .line2("")
        .city("Turner")
        .state("ACT")
        .postalCode("2612")
        .country("Australia")
        .addressType("Principle Place of Business")
        .build();

      addressRepository.save(headOffice);

      // Create the Primary Contact (Individual)

      Party individualParty = Party.builder()
        .type(PartyType.INDIVIDUAL)
        .displayName("Hull" + ", " + "Jordan")
        .addresses(new HashSet<Address>())
        .roles(new HashSet<Role>())
        .build();

      Individual individual = Individual.builder()
        .party(individualParty)
        .names(new HashSet<>())
        .sex(Sex.MALE.toString())
        .email("jordan.hull@greens.org.au")
        .phoneNumber("(02) 6140 3220")
        .sort("Hull")
        .build();

      // Save the Primary Contact (Individual)

      individualRepository.save(individual);

      // Create and save the Primary Contact's names

      IndividualName individualName = IndividualName.builder()
        .individual(individual)
        .type(IndividualNameType.LEGAL_NAME.toString())
        .givenName("Jordan")
        .familyName("Hull")
        // .fromDate(currentTime)
        .build();

      individualNameRepository.save(individualName);

      // Organisation

      Party organisationParty = Party.builder()
        .type(PartyType.ORGANISATION)
        .legalType(LegalType.OTHER_INCORPORATED_ENTITY.toString())
        .displayName(PoliticalParty.AUSTRALIAN_GREENS.toString())
        .addresses(new HashSet<Address>())
        .roles(new HashSet<Role>())
        .build();

      Organisation organisation = Organisation.builder()
        .party(organisationParty)
        .name(PoliticalParty.AUSTRALIAN_GREENS.toString())
        .email("greens@greens.org.au")
        .phoneNumber("(02) 6140 3220")
        .build();

      organisationRepository.save(organisation);

      // Organisation, Relationship -> Primary Contact

      Role role = Role.builder()
        .role("Organisation")
        .partyId(organisation.getParty().getId())
        .partyType(organisation.getParty().getType())
        .partyName(organisation.getParty().getDisplayName())
        .partyEmail(organisation.getEmail())
        .partyPhoneNumber(organisation.getPhoneNumber())
        .relationship("Primary Contact")
        .reciprocalRole("Member")
        .reciprocalPartyId(individual.getParty().getId())
        .reciprocalPartyType(individual.getParty().getType())
        .reciprocalPartyName(individual.getParty().getDisplayName())
        .reciprocalPartyEmail(individual.getEmail())
        .reciprocalPartyPhoneNumber(individual.getPhoneNumber())
        .build();

      roleRepository.save(role);

      organisationParty.getAddresses().add(headOffice);
      organisationParty.getRoles().add(role);

      organisationRepository.save(organisation);

      // Primary Contact, Relationship -> Membership

      Role reciprocalRole = Role.builder()
        .role("Member")
        .partyId(individual.getParty().getId())
        .partyType(individual.getParty().getType())
        .partyName(individual.getParty().getDisplayName())
        .partyEmail(individual.getEmail())
        .partyPhoneNumber(individual.getPhoneNumber())
        .relationship("Membership")
        .reciprocalRole("Organisation")
        .reciprocalPartyId(organisation.getParty().getId())
        .reciprocalPartyType(organisation.getParty().getType())
        .reciprocalPartyName(organisation.getParty().getDisplayName())
        .reciprocalPartyEmail(organisation.getEmail())
        .reciprocalPartyPhoneNumber(organisation.getPhoneNumber())
        .build();

      roleRepository.save(reciprocalRole);

      individualParty.getAddresses().add(headOffice);
      individualParty.getRoles().add(reciprocalRole);

      individualRepository.save(individual);

      log.info("Create {} complete", PoliticalParty.AUSTRALIAN_GREENS.toString());

    } catch (Exception e) {

      log.error("{}", e.getLocalizedMessage());
    }

  }

}
