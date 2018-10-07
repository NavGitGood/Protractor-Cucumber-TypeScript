Feature: Feature to test homepage navigation to angular heroes app

   Scenario: Verify title
        Given I launch heroes app
        Then App title should be "Tour of Heroes"

    Scenario: Verify Dashboard
        Given I am on home page
        When I click on "Dashboard"
        Then "dashboard" resource should be loaded
        And Top Heroes should be as follows
            | Hero Name |
            | Narco     |
            | Bombasto  |
            | Celeritas |
            | Magneta   |

    Scenario: Verify Heroes
        Given I am on home page
        When I click on "Heroes"
        Then "heroes" resource should be loaded
        And My Heroes should be as follows
            | Hero Name |
            | Mr. Nice  |
            | Narco     |
            | Bombasto  |
            | Celeritas |
            | Magneta   |
            | RubberMan |
            | Dynama    |
            | Dr IQ     |
            | Magma     |
            | Tornado   |

    Scenario: Verify Cars
        Given I am on home page
        When I click on "Heroes Grid"
        Then "heroesgrid" resource should be loaded
        And Headers should be as follows
            | Header Name |
            | Make        |
            | Model       |
            | Price       |
