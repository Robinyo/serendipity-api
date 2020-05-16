package org.serendipity.restapi.database.seed;

import lombok.extern.slf4j.Slf4j;
import org.serendipity.restapi.entity.*;
import org.serendipity.restapi.repository.AddressRepository;
import org.serendipity.restapi.repository.IndividualRepository;
import org.serendipity.restapi.repository.OrganisationRepository;
import org.serendipity.restapi.repository.RoleRepository;
import org.serendipity.restapi.type.LocationType;
import org.serendipity.restapi.type.PartyType;
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
@Order(6)
public class LiberalPartyOfAustralia implements CommandLineRunner {

  @Autowired
  private AddressRepository addressRepository;

  @Autowired
  private IndividualRepository individualRepository;

  @Autowired
  private OrganisationRepository organisationRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Override
  @Transactional
  public void run(String... args) throws Exception {

    log.info("Create {} ...", AustralianPoliticalParty.LIBERAL_PARTY_OF_AUSTRALIA.toString());

    try {

      //
      // Head Office Address
      //

      Timestamp currentTime = new Timestamp(System.currentTimeMillis());

      Location location = Location.builder()
        .type(LocationType.ADDRESS)
        .displayName("Cnr Blackall and Macquarie Streets Barton ACT 2612")
        .fromDate(currentTime)
        .build();

      Address headOffice = Address.builder()
        .location(location)
        .name("RG Menzies House")
        .line1("Cnr Blackall and Macquarie Streets")
        .line2("")
        .city("Barton")
        .state("ACT")
        .postalCode("2600")
        .country("Australia")
        .addressType("Principle Place of Business")
        .build();

      addressRepository.save(headOffice);

      // Primary Contact (Individual)

      Party individualParty = Party.builder()
        .type(PartyType.INDIVIDUAL)
        .displayName("Greiner" + ", " + "Nick")
        .addresses(new HashSet<Address>())
        .roles(new HashSet<Role>())
        .build();

      Individual individual = Individual.builder()
        .party(individualParty)
        .givenName("Nick")
        .familyName("Greiner")
        .sex(Sex.MALE.toString())
        .email("nick.greiner@liberal.org.au")
        .phoneNumber("(02) 6140 3220")
        .build();

      individualRepository.save(individual);

      // Organisation

      Party organisationParty = Party.builder()
        .type(PartyType.ORGANISATION)
        .legalType(LegalType.OTHER_INCORPORATED_ENTITY.toString())
        .displayName(AustralianPoliticalParty.LIBERAL_PARTY_OF_AUSTRALIA.toString())
        .addresses(new HashSet<Address>())
        .roles(new HashSet<Role>())
        .build();

      Organisation organisation = Organisation.builder()
        .party(organisationParty)
        .name(AustralianPoliticalParty.LIBERAL_PARTY_OF_AUSTRALIA.toString())
        .email("libadm@liberal.org.au")
        .phoneNumber("(02) 6273 2564")
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

      log.info("Create {} complete", AustralianPoliticalParty.LIBERAL_PARTY_OF_AUSTRALIA.toString());

    } catch (Exception e) {

      log.error("{}", e.getLocalizedMessage());
    }

  }

}
