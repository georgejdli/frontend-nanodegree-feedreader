/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have urls', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url.length).not.toBe(0);
                //need to check if url is valid?
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name.length).not.toBe(0);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var bodyClass = $('body').attr('class');
        /*beforeEach(function() {
            bodyClass = $('body').attr('class');
        });
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(bodyClass).toContain('menu-hidden');
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            bodyClass = $('body').attr('class');
            expect(bodyClass).not.toContain('menu-hidden');
            
            menuIcon.trigger('click');
            bodyClass = $('body').attr('class');
            expect(bodyClass).toContain('menu-hidden');
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //check when init or loadFeed is called
        //query .feed contain and check children .entry-link for child .entry
        //loadFeed(0) loads before DOM is completed on feedreader page
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /*afterAll(function(done) {
            loadFeed(1,done);
        }); */
        it('are loaded', function(done) {
            setTimeout(function() {
            expect( $('.feed > .entry-link > .entry').length ).not.toEqual(0);
            console.log($('.feed > .entry-link').attr('href'));
            done();
            });           
        }, 100);
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        //once done() is called the enclosing function terminates
        //might need a spy for this one to monitor loadFeed?
        //done() may not work for beforeAll, loadFeed0 not completing before loadFeed1
        /*beforeAll(function(done) {
            loadFeed(0, done());
        });*/
        var feedDiv0,
            feedDiv1;
        
        beforeEach(function(done) {
            feedDiv0 = $('.feed > .entry-link').attr('href');
            console.log(feedDiv0);
            loadFeed(2, done());
        });
        afterAll(function(done) {
            loadFeed(0, done());
        });
        it('loads new content on the page', function(done) {
            //feedDiv1 not getting correct href
            //loadFeed(2) must not be completing on time
            //maybe use setTimeOut
            setTimeout(function() {
                feedDiv1 = $('.feed > .entry-link').attr('href');
                console.log(feedDiv1);
                expect(feedDiv1).not.toEqual(feedDiv0);
                done();
            }, 300);
            
        });
    });
    /*new features
        mark an entry as read
        remove/hide an entry from the list
    */
}());
