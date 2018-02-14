
(function(){

    var Memory = {

        init: function(cards){
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.restart");
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },

        shuffleCards: function(cardsArray){
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function(){
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.paused = false;
            this.guess = null;
            this.binding();
        },

        binding: function(){
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },
        // kinda messy but hey
        cardClicked: function(){
            var _ = Memory;
            var $card = $(this);
            if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
                $card.find(".inside").addClass("picked");
                if(!_.guess){
                    _.guess = $(this).attr("data-id");
                } else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function(){
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }
                if($(".matched").length == $(".card").length){
                    _.win();
                }
            }
        },

        win: function(){
            this.paused = true;
            setTimeout(function(){
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1000);
        },

        showModal: function(){
            this.$overlay.show();
            this.$modal.fadeIn("slow");
        },

        hideModal: function(){
            this.$overlay.hide();
            this.$modal.hide();
        },

        reset: function(){
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show("slow");
        },

        shuffle: function(array){
            var counter = array.length, temp, index;
            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function(){
            var frag = '';
            this.$cards.each(function(k, v){
                frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://vignette.wikia.nocookie.net/hornby-thomas-engines-releases/images/6/6d/Thomas_and_friends_logo.jpg/revision/latest?cb=20130307105349"\
				alt="Thomas" /></div></div>\
				</div>';
            });
            return frag;
        }
    };

    var cards = [
        {
            name: "Stanley",
            img: "https://vignette2.wikia.nocookie.net/films-tv-shows-and-wildlife/images/a/a9/StanleyCGIpromo2.png/revision/latest?cb=20151213185745",
            id: 1,
        },
        {
            name: "Samson",
            img: "https://vignette.wikia.nocookie.net/ttte/images/4/47/Samson2.png/revision/latest?cb=20160110203655",
            id: 2
        },
        {
            name: "Edward",
            img: "https://vignette.wikia.nocookie.net/scratchpad/images/b/b2/EdwardCGIpromo3.jpg/revision/latest/scale-to-width-down/268?cb=20161211235108",
            id: 3
        },
        {
            name: "James",
            img: "https://vignette.wikia.nocookie.net/sml/images/4/4e/JamesCGIpromo7.jpg/revision/latest?cb=20170108110344",
            id: 4
        },
        {
            name: "Philip",
            img: "https://vignette2.wikia.nocookie.net/p__/images/d/d2/Philip.png/revision/latest?cb=20160317232350&path-prefix=protagonist",
            id: 5
        },
        {
            name: "Charlie",
            img: "https://vignette.wikia.nocookie.net/thomas-friends-cgi-series/images/8/83/Charliepromo4.jpg/revision/latest?cb=20160215041656",
            id: 6
        },
        {
            name: "Whiff",
            img: "https://vignette.wikia.nocookie.net/thomas-and-friends-the-cgi-series/images/b/bd/WhiffCGIpromo2.png/revision/latest?cb=20160502155926",
            id: 7
        },
        {
            name: "Stafford",
            img: "https://vignette.wikia.nocookie.net/thomasandfriends/images/c/c1/Staffordpromo.png/revision/latest?cb=20150721161901",
            id: 8
        },
        {
            name: "Oliver",
            img: "https://vignette.wikia.nocookie.net/thomas-and-friends-the-cgi-series/images/1/1e/OliverCGIpromo2.png/revision/latest?cb=20160430175854",
            id: 9
        },
        {
            name: "Emily",
            img: "https://vignette.wikia.nocookie.net/films-tv-shows-and-wildlife/images/2/21/EmilyCGIpromo.png/revision/latest?cb=20150322233818",
            id: 10
        },
        {
            name: "Rosie",
            img: "https://vignette.wikia.nocookie.net/thomas-and-friends-the-cgi-series/images/7/78/RosieCGINWR.png/revision/latest?cb=20170804134818",
            id: 11
        },
        {
            name: "Salty",
            img: "https://vignette.wikia.nocookie.net/thomas-and-friends-the-cgi-series/images/b/be/SaltyattheDocksCGIpromo.png/revision/latest?cb=20160502154620",
            id: 12
        },
    ];

    Memory.init(cards);


})();