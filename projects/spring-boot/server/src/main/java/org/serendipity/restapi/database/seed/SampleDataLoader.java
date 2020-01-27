package org.serendipity.restapi.database.seed;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import org.serendipity.restapi.model.Address;
import org.serendipity.restapi.model.Individual;
import org.serendipity.restapi.model.Location;
import org.serendipity.restapi.model.Party;

import org.serendipity.restapi.repository.IndividualRepository;
import org.serendipity.restapi.repository.AddressRepository;

@Component
@Slf4j
public class SampleDataLoader implements CommandLineRunner {
  
  @Autowired
  private AddressRepository addressRepository;
  
  @Autowired
  private IndividualRepository individualRepository;

  @Override
  public void run(String... args) throws Exception {
    
    log.info("Loading sample data ...");
    
    Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    
    Party individualParty = Party.builder()
        .type("Individual")
        .displayName("Rob Ferguson")
        .build();
    
    Date dateOfBirth = new SimpleDateFormat("dd/MM/yyyy").parse("13/01/1989"); 
    
    Individual individual = Individual.builder().party(individualParty)
        .title("Mr")
        .givenName("Robert")
        .middleName("James")
        .familyName("Ferguson")
        .honorific("")
        .salutation("Rob")
        .preferredName("Rob")
        .initials("R.J.")
        .dateOfBirth(dateOfBirth)
        .placeOfBirth("Gunnedah")
        .gender("Male")
        .email("rob.ferguson@robferguson.org")
        .phoneNumber("(02) 6234 4321")
        .photoUrl("")
        .build();
    
    individualRepository.save(individual);
    
    Location location = Location.builder()
        .type("Address")
        .displayName("PO Box 6100 Parliament House Canberra ACT 2600")
        .fromDate(timestamp)
        .build();
    
    Address parliamentHouse = Address.builder()
        .location(location)
        .name("The Senate")
        .line1("PO Box 6100")
        .line2("Parliament House")
        .city("Canberra")
        .state("ACT")
        .postalCode("2600")
        .country("Australia")
        .addressType("Mailing")
        .build();
    
    addressRepository.save(parliamentHouse);

  }
  
}

/*

    // Auditable auditable = new Auditable();

    Location location = new Location();
    location.setType("Address");
    location.setFromDate(timestamp);
    location.setDisplayName("PO Box 6100 Parliament House Canberra ACT 2600");
  
*/
