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
        //call loadFeed
        //query .feed container and check children .entry-link for child .entry
        //loadFeed(0) loads before DOM is completed on feedreader page
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('are loaded', function(done) {
            expect( $('.feed > .entry-link > .entry').length ).not.toEqual(0);
            //console.log($('.feed > .entry-link').attr('href'));
            done();        
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedDiv0,
            feedDiv1;
        
        beforeEach(function(done) {
            //grab the href attribute of the first article in feed0
            feedDiv0 = $('.feed > .entry-link').attr('href');
            //console.log(feedDiv0);
            //load a different feed
            loadFeed(1, function() {
                done();
            });
        });
        //reset page to the first feed after testing
        afterAll(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('loads new content on the page', function(done) { 
            //grab the href attribute of the first article in feed1
            feedDiv1 = $('.feed > .entry-link').attr('href');
            //console.log(feedDiv1);
            expect(feedDiv1).not.toEqual(feedDiv0);
            done();
        });
    });
    
    /*new features
        mark an entry as read
        remove/hide an entry from the list
    */
    
    describe('When entries have been read', function() {

        //reset class changes after testing
        afterAll(function() {
            $('.marked-read').toggleClass('marked-read');
        });
        
        /* Each link with 'entry-link' class should have a class 'marked-read' 
         * applied to it when it is clicked
         * There should be corresponding CSS rules that change the color 
         * of the link to visually indicate that the link has been read
         */
        it('the text for the link changes color', function() {
            var entries = $('.entry-link');
            //to make this test more robust it will test a feed entry at random
            var randomEntry = Math.floor(Math.random() * entries.length);
            
            var originalColor = $(entries[randomEntry]).css('color');
            //trigger a click to test
            entries[randomEntry].click();
            var newColor = $(entries[randomEntry]).css('color');
            
            expect($(entries[randomEntry]).attr('class')).toContain('marked-read');
            //expect color value after click to NOT equal color before click
            expect(newColor).not.toEqual(originalColor);
        });
        it('there is a button to mark all links as read', function() {

        });


    });
    describe('Removing feed items:', function() {
        it('Each item has a button', function() {

        });

        it('when clicked removes that feed item from the list', function() {

        });
        it('There is a button called remove read items', function() {

        });
        it('that removes items that have been marked as read', function() {

        });
    });
}());
