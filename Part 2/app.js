$(function() {
    const API = "https://deckofcardsapi.com/api/deck";

    //1:
    async function drawOneCard(){
        let res = await $.getJSON(`${API}/new/draw`);
        let {suit, value} = res.cards[0];

        console.log(`${value.toLowerCase()} of ${suit.toLowerCas()}`);
    }

    //2:
    async function drawTwoCards() {
        let cardOne = await $.getJSON(`${API}/new/draw/`);
        let deckId = cardOne.deck_id;
        let cardTwo = await $.getJSON(`${API}/${deckId}/draw/`);
        [cardOne, cardTwo].forEach(card => {
          let { suit, value } = card.cards[0];
          console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });
      }

    //3:
    async function drawCard(){
        let $button = $("button");
        let $cardDiv = $("#card-div");
        let cardDeck = await $.getJSON(`${API}/new/shuffle/`);
        let $messageDiv = $("#message");
        let rotation = -18;
        let changeRotation = (num) => {
            return rotation = rotation + 18;
        };

        $button.show().on('click', async function(){
            let cardRes = await $.getJSON(`${API}/${cardDeck.deck_id}/draw/`);
            let cardImg = cardRes.cards[0].image;

            $cardDiv.append(
                $('<img>',{
                    src: cardImg,
                    css: {
                        transform: `rotate(${changeRotation(rotation)}deg)`
                    }
                })
            );
            if (cardRes.remaining === 0) $messageDiv.append("<h2>No More Cards In The Deck</h2>");
        });
    }
    drawCard();
});