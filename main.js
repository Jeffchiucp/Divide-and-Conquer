var app = angular.module('app', ['truncate']);

app.controller('mainController', function ($scope) {

    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var config = {
        apiKey: "AIzaSyBpRVyTFmF6kJ8uCHgMYmvXtsdAMIh0zvg",
        authDomain: "helpmeresearch-9ca36.firebaseapp.com",
        databaseURL: "https://helpmeresearch-9ca36.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "637176980786"
    };
    firebase.initializeApp(config);

    //// Get Firebase Database reference.
    var firepadRef = getExampleRef();

    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
        lineWrapping: true
    });

    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextToolbar: true,
        richTextShortcuts: true
    });

    //// Initialize contents.
    firepad.on('ready', function () {
        if (firepad.isHistoryEmpty()) {

        }
    });


    // Helper to get hash from end of URL or generate a random one.
    function getExampleRef() {
        var ref = firebase.database().ref();
        var hash = window.location.hash.replace(/#/g, '');
        if (hash) {
            ref = ref.child(hash);
        } else {
            ref = ref.push(); // generate unique location.
            window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
        }
        if (typeof console !== 'undefined') {
            console.log('Firebase data: ', ref.toString());
        }
        return ref;
    }


    //    $scope.dataObj = {
    //        "1": {
    //            "title": "Generic Source 1",
    //            "website": "abc.com",
    //            "summary": "This is a summary of some information",
    //            "cited": "247",
    //            "cit": "(Smith 1999)",
    //            "author": "John Smith",
    //            "date": "09172016",
    //        },
    //        "2": {
    //            "title": "Wikipedia",
    //            "website": "abc.com",
    //            "summary": "Information of a summary and stuff",
    //            "cited": "247",
    //            "cit": "(Smith 1999)",
    //            "author": "Jason Bourne",
    //            "date": "09172016",
    //        },
    //        "3": {
    //            "title": "Google Scholar",
    //            "website": "abc.com",
    //            "summary": "This is a summary of some information",
    //            "cited": "247",
    //            "cit": "(Smith 1999)",
    //            "author": "John Smith",
    //            "date": "09172016",
    //        },
    //        "4": {
    //            "title": "Google Scholar",
    //            "website": "abc.com",
    //            "summary": "This is a summary of some information",
    //            "cited": "247",
    //            "cit": "(Smith 1999)",
    //            "author": "John Smith",
    //            "date": "09172016",
    //        },
    //        "5": {
    //            "title": "Google Scholar",
    //            "website": "abc.com",
    //            "summary": "This is a summary of some information",
    //            "cited": "247",
    //            "cit": "(Smith 1999)",
    //            "author": "John Smith",
    //            "date": "09172016",
    //        },
    //
    //    }
    //
    //
    //    $scope.dataArray = [
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://static1.squarespace.com/static/53812dbee4b03134acdffb86/t/5384a06fe4b0ac7f7a7e24ae/1401200756065/Momentum-small.png?format=1500w",
    //            "summary": "Momentum Advisors is a Financial Planning and Investment Advisory firm that is geared toward individuals and institutions which have achieved extraordinary levels of success.Our clients are an elite group of entrepreneurs, executives, athletes and board members who demand the same excellence in their advisors that they have demonstrated in their own lives.They require an intensely personal approach that relies upon years of experience, attention to detail, and above all else, objectivity.Momentum Advisors is a Securities and Exchange Commission (\"SEC\") Registered Investment Advisor (RIA).",
    //            "title": "MOMENTUM ADVISORS",
    //            "website": "http://www.momentum-advisors.com/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyMzA1NzcyNDleQTJeQWpwZ15BbWU4MDk3MzQ3ODYx._V1_UX182_CR0,0,182,268_AL_.jpg",
    //            "summary": "Alex, a mysterious thief, is pulled in by her former partner for one last heist.A brutal murder sparks a cat and mouse chase between Alex and a master assassin.Now she must uncover the lies behind the heist and discover the secrets behind the men who have made her a target.",
    //            "title": "Momentum (2015) - IMDb",
    //            "website": "http://www.imdb.com/title/tt3181776/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://www.tspfolio.com/media/29_momentum.jpg",
    //            "summary": "Momentum is the tendency of recent price changes in an investment or asset class to persist for some period of time into the future.The evidence for momentum is pervasive, supported by academic and practitioner research and more than 300 published papers over the past decades.We won't attempt to summarize the momentum literature, but encourage investors to learn more about it, starting with the bibliography , below.Investor behavior is one important cause of momentum: market participants, driven by basic human emotions such as fear and greed, tend to either overreact or underreact during different time frames.",
    //            "title": "Using Momentum to Achieve Superior Risk-Adjusted Investment Returns",
    //            "website": "http://www.tspfolio.com/blog/20/Using_Momentum_to_Achieve_Superior_Risk_Adjusted_Investment_Returns",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://images.tutorvista.com/cms/images/95/conservation-of-momentum-experiment1.jpg",
    //            "summary": "When the mechanical properties of the system do not change then the system is in isolated state and it is called an .The conservation laws are for isolated system because their properties are conserved and do not change.These laws are fundamental laws of mechanics in which the quantities like energy, angular momentum, and momentum etc. which are conserved quantities.So, in the conservation law of momentum, the sum of all object momentum remains constant in interaction within the system.",
    //            "title": "Conservation of Momentum, Law of Conservation of Momentum ...",
    //            "website": "http://physics.tutorvista.com/momentum/conservation-of-momentum.html",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://zonalandeducation.com/mstm/physics/mechanics/momentum/definition/definePicture.png",
    //            "summary": "That is, within a closed system of interacting objects, the total momentum of that system does not change value.This allows you to calculate and predict outcomes when objects bounce into one another.Or by knowing the outcome of a collision, you can figure out what was the initial state of the system.That is: To calculate the momentum for this object we will multiply the mass times the velocity: So, the momentum of the object is calculated to be 8.0 kg-m/s.",
    //            "title": "Momentum, Definition | Zona Land Education",
    //            "website": "http://zonalandeducation.com/mstm/physics/mechanics/momentum/definition/momentumDefinition1.html",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://images.huffingtonpost.com/2015-10-11-1444578700-9851108-momentum.jpg",
    //            "summary": "This marathon of Jewish Holy Days earned many of us an increased spiritual awareness, sensitivity and commitment.But how can we maintain that growth throughout the year?Here are five suggestions for maintaining the momentum of the High Holidays:Shabbat is a weekly opportunity to unplug and stay in good spiritual health.Meals with family and friends, communal worship, connecting with community, and creating time to rejuvenate are critical elements to Shabbat, and to keeping the High Holiday growth going during the year ahead.A person who is not engaged in daily Torah study is depriving themselves of the nutrients they need to stay in good spiritual health, nurture their soul and develop a stronger connection with God.",
    //            "title": "5 Ways to Keep the Spiritual Momentum of the High Holidays ...",
    //            "website": "http://www.huffingtonpost.com/rabbi-yonah-bookstein/5-ways-to-keep-the-spirit_b_8276758.html",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Relativity_an_apple_in_a_lift.svg/220px-Relativity_an_apple_in_a_lift.svg.png",
    //            "summary": "In classical mechanics, linear momentum, translational momentum, or simply momentum (pl.Like velocity, linear momentum is a vector quantity, possessing a direction as well as a magnitude: where p is the three-dimensional vector stating the object's momentum in the three directions of three-dimensional space, v is the three-dimensional velocity vector giving the object's rate of movement in each direction, and m is the object's mass.One might then try to invoke Newton's second law of motion by saying that the external force F on the object is related to its momentum p(t) by F = dp/dt, but this is incorrect, as is the related expression found by applying the product rule to d(mv)/dt:[16] This equation does not correctly describe the motion of variable-mass objects.The 4-Momentum is related to the 4-WaveVector in Special Relativity [22] The (temporal component) Planck\u2013Einstein relation E = \u210f \u03c9 {\\displaystyle E=\\hbar \\omega } The (spatial components) de Broglie matter wave relation p \u2192 = \u210f k \u2192 {\\displaystyle {\\vec {\\mathbf {p} }}=\\hbar {\\vec {\\mathbf {k} }}} The magnitude of the momentum four-vector is equal to m0c: The relativistic energy\u2013momentum relationship holds even for massless particles such as photons; by setting m0 = 0 it follows that In a game of relativistic \"billiards\", if a stationary particle is hit by a moving particle in an elastic collision, the paths formed by the two afterwards will form an acute angle.",
    //            "title": "Momentum - Wikipedia, the free encyclopedia",
    //            "website": "https://en.wikipedia.org/wiki/Momentum",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "https://upload.wikimedia.org/wikipedia/commons/8/86/Billard.JPG",
    //            "summary": "In classical mechanics, linear momentum, translational momentum, or simply momentum (pl.Like velocity, linear momentum is a vector quantity, possessing a direction as well as a magnitude: where p is the three-dimensional vector stating the object's momentum in the three directions of three-dimensional space, v is the three-dimensional velocity vector giving the object's rate of movement in each direction, and m is the object's mass.One might then try to invoke Newton's second law of motion by saying that the external force F on the object is related to its momentum p(t) by F = dp/dt, but this is incorrect, as is the related expression found by applying the product rule to d(mv)/dt:[16] This equation does not correctly describe the motion of variable-mass objects.The 4-Momentum is related to the 4-WaveVector in Special Relativity [22] The (temporal component) Planck\u2013Einstein relation E = \u210f \u03c9 {\\displaystyle E=\\hbar \\omega } The (spatial components) de Broglie matter wave relation p \u2192 = \u210f k \u2192 {\\displaystyle {\\vec {\\mathbf {p} }}=\\hbar {\\vec {\\mathbf {k} }}} The magnitude of the momentum four-vector is equal to m0c: The relativistic energy\u2013momentum relationship holds even for massless particles such as photons; by setting m0 = 0 it follows that In a game of relativistic \"billiards\", if a stationary particle is hit by a moving particle in an elastic collision, the paths formed by the two afterwards will form an acute angle.",
    //            "title": "Momentum - Wikipedia, the free encyclopedia",
    //            "website": "https://en.wikipedia.org/wiki/Momentum",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://leavingitontheroad.com/wp-content/uploads/2016/03/momentum.png",
    //            "summary": "Today I want to talk about the delicate balance of a little thing called momentum.Instead of letting your mind run wild, try and reign in those thoughts so that the next time you\u00a0start\u00a0thinking negatively, remove the thought and replace it with something positive.Over\u00a0time, this simple switch in your thought process can\u00a0become powerful tool\u00a0towards momentum.Life is\u00a0full\u00a0of influences, from the people you spend time with to the places you live, the music you enjoy, and\u00a0the television you watch.",
    //            "title": "The Power of Momentum - Leaving It On The Road",
    //            "website": "http://leavingitontheroad.com/the-power-of-momentum/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://wcpadventure.com/wp-content/uploads/2013/03/direction.jpg",
    //            "summary": "This is an excellent small company that provides quality camping/travel adventures in South Korea.This is an outstanding way for the budgettraveler to experience the country in a safe and fun way!!",
    //            "title": "Direction In Korea - WCP Adventure-Camping Tour-",
    //            "website": "http://wcpadventure.com/travel-in-korea/direction-in-korea/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "https://lh4.ggpht.com/U9PEvwGV5YXxSAlKQ2fLip8xoFd3cdyVn34Kt_8btv2aM2s-F9FKnTvOc7n81QSV9j4=h900",
    //            "summary": "Unable to create summary for non english content",
    //            "title": "Direction Indicator - Android Apps on Google Play",
    //            "website": "https://play.google.com/store/apps/details?id=com.prashantb.compass",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "https://www.kullabs.com/uploads/concept.png",
    //            "summary": "It clearly envisages that directing is a part of managerial function and process in which senior issues orders, gives instructions, provides leadership, guides and supervises subordinates performance, motivates them to develop confidence and zeal.Direction can be also defined in terms of instruction, supervision, motivation, leadership and communication.According to Ernest Dale,\"Direction is telling people what to do and seeing that they do it to the best of their ability.\"A manager with effective motivation and leadership should adopt such direction techniques that the capability of individuals should be utilized in its true sense.",
    //            "title": "Concept and Principle of Direction | Kullabs.com",
    //            "website": "https://www.kullabs.com/class-12/business-studies-1/direction/concept-and-principle-of-direction",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://www.impossiblehq.com/wp-content/uploads/2010/09/116220689_438039ddb3_b.jpg",
    //            "summary": "I was talking with Tim Morris from Intentional Influence last night via Skype.At some point in the conversation we touched upon being more \"intentional\" and Tim said something that really stuck with me.\u2013 Tim Morris I can \"intend\" to do all sorts of things, but until I point myself in that direction and start dong them, I won't ever get to my destination or reach my goals because I'm not headed towards them.Unless you change your direction, you'll just end up going west.",
    //            "title": "Intention vs. Direction: The Difference Determines Your Success ...",
    //            "website": "http://impossiblehq.com/intention-vs-direction/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://goinswriter.com/wp-content/uploads/2013/02/right-direction.jpg",
    //            "summary": "I don't know if it's the best idea I've had \u2014 or the worst.I meet lots of people who tell me they're thinking about doing something risky and new.So if you're not sure you're headed in the right direction, take heart; you're in good company.How do you know you're headed in the right direction?",
    //            "title": "How to Know You're Headed in the Right Direction",
    //            "website": "http://goinswriter.com/right-direction/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://bbh-labs.com/wp-content/uploads/2011/03/Creative-Direction.jpg",
    //            "summary": "Creative Direction is about having a vision and making sure the vision is clear to everyone involved.That's why Creative Direction has to start early in collaboration with planners, even before a brief is written, and follow through to the end of the rainbow.In other words, if Creative Direction is done right, you should never have to select.The process can only be fixed if the Creative Director doesn't sit above others.",
    //            "title": "Creative Direction vs. Creative Selection | BBH Labs",
    //            "website": "http://bbh-labs.com/creative-direction-vs-creative-selection/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Brosen_windrose.svg/2000px-Brosen_windrose.svg.png",
    //            "summary": "The four cardinal directions or cardinal points are the directions of north, east, south, and west, commonly denoted by their initials: N, E, S, W. East and west are at right angles to north and south, with east being in the clockwise direction of rotation from north and west being directly opposite east.Intermediate points between the four cardinal directions form the points of the compass.The intermediate (intercardinal, or ordinal) directions are northeast (NE), southeast (SE), southwest (SW), and northwest (NW).Many portable GPS-based navigation computers today can be set to display maps either conventionally (N always up, E always right) or with the current instantaneous direction of travel, called the heading, always up (and whatever direction is +90\u00b0 from that to the right).",
    //            "title": "Cardinal direction - Wikipedia, the free encyclopedia",
    //            "website": "https://en.wikipedia.org/wiki/Cardinal_direction",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://teacherpop.org/wp-content/uploads/2015/03/116220689_438039ddb3_o.jpg",
    //            "summary": "Give an Hour, an organization that provides free mental health services to veterans and their families, today launched a five-year campaign to change the direction of mental health in the U. S. By encouraging individuals, nonprofits, schools, and other institutions to respect mental health needs as thoroughly as they recognize physical wellbeing, the Change Direction campaign urges everyone to make a simple pledge to learn the five signs of emotional suffering:\u00a0 withdrawal, agitation, hopelessness, decline in personal care, and change in personality.Today's post considers the stigma attached to mental illness, and how you can help change it.The early treatment success rates for mental illnesses are 60 to 80%, well above the approximately 40 to 60% success rates for common surgical treatments for heart disease.Start by making a pledge to know the signs of suffering and share your commitment using the hashtag #ChangeMentalHealth.",
    //            "title": "Take the Pledge to Change Direction: Recognizing the Signs of ...",
    //            "website": "http://teacherpop.org/2015/03/take-the-pledge-to-change-direction-recognizing-the-signs-of-emotional-suffering/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://blogs.cornell.edu/internationalalumninews/files/2015/02/atom-electrons-1ftav5v.jpg",
    //            "summary": "A first-of-its-kind electron microscope, which will allow materials to be studied in their natural environments using an electron beam focused down to a subatomic spot, is coming to Cornell.The National Science Foundation has given Cornell $2.7 million to acquire a cryogenic, aberration-corrected scanning transmission electron microscope.The NSF grant was awarded to an interdisciplinary team led by Lena F. Kourkoutis, assistant professor of applied and engineering physics and a Rebecca Q. and James C. Morgan Sesquicentennial Faculty Fellow.",
    //            "title": "NSF Grant To Fund 'Revolutionary' Electron Microscope | Noteworthy ...",
    //            "website": "http://blogs.cornell.edu/internationalalumninews/2015/02/12/nsf-grant-to-fund-revolutionary-electron-microscope/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://electron.atom.io/images/electron-api-demos.png",
    //            "summary": "Learn how to wrap your web app with Electron, access all the APIs, and generate installers.",
    //            "title": "Electron - Build cross platform desktop apps with JavaScript, HTML ...",
    //            "website": "http://electron.atom.io/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://electron.atom.io/images/apps/nylas.png",
    //            "summary": "Learn how to wrap your web app with Electron, access all the APIs, and generate installers.",
    //            "title": "Electron - Build cross platform desktop apps with JavaScript, HTML ...",
    //            "website": "http://electron.atom.io/",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://science.jrank.org/article_images/ep201102/science/science982.jpg",
    //            "summary": "Bohr, the classical model of the atom was similar to the Copernican model of the solar system where, just as planets orbit the Sun, electrically negative electrons moved in orbits about a relatively massive, positively charged nucleus.This predicted that when, for example, a hydrogen atom was heated, it should produce a continuous spectrum of colors as it cooled because its electron, moved away from the nucleus by the heat energy, would gradually give up that energy as it spiraled back closer to the nucleus.Atoms with electrons in their lowest energy orbits are in a \"ground\" state, and those with electrons jumped to higher energy orbits are in an \"excited\" state.Atoms may acquire energy that excites electrons by random thermal collisions, collisions with subatomic particles, or by absorbing a photon.",
    //            "title": "Bohr Model - Energy, Electrons, Quantum, and Electron - JRank Articles",
    //            "website": "http://science.jrank.org/pages/982/Bohr-Model.html",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://www.abc.net.au/reslib/201402/r1239525_16420765.jpg",
    //            "summary": "Tiny particle Scientists in Germany say they have made the most precise measurement yet of the mass of the electron, one of the building blocks of matter.The feat should provide a useful tool for scientists testing the 'Standard Model' of physics \u2014 the most widely-accepted theory of the particles and forces that comprise the Universe, they say.Thomson, who dubbed them \"corpuscles\" \u2014 a name later changed to 'electron' because of its connection with electrical charge.They measured a single electron that was bound to a carbon nucleus whose mass was already known.",
    //            "title": "The incredible lightness of being ... an electron \u203a News in ...",
    //            "website": "http://www.abc.net.au/science/articles/2014/02/20/3948666.htm",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://www.chem4kids.com/files/art/atom_electron1.png",
    //            "summary": "Together, all of the electrons of an atom create a charge that balances the positive charge of the protons in the atomic nucleus.The overall shape of the shells changes depending on how many electrons an element has.The overall shell shape will also be more complex (because of the ) as you have more electrons.The negatively charged pieces of any circuit have extra electrons, while the positively charged pieces want more electrons.",
    //            "title": "Chem4Kids.com: Atoms: Electrons",
    //            "website": "http://www.chem4kids.com/files/atom_electron.html",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "https://camo.githubusercontent.com/5dd01312b30468423cb45b582b83773f5a9019bb/687474703a2f2f656c656374726f6e2e61746f6d2e696f2f696d616765732f656c656374726f6e2d6c6f676f2e737667",
    //            "summary": "The Electron framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS.It is based on Node.js and Chromium and is used by the Atom editor and many other apps.Prebuilt binaries and debug symbols of Electron for Linux, Windows and macOS can be found on the releases page.You can also use npm to install prebuilt electron binaries:Guides and the API reference are located in the docs directory.",
    //            "title": "GitHub - electron/electron: Build cross platform desktop apps with ...",
    //            "website": "https://github.com/electron/electron",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Electron_Interaction_with_Matter.svg/2000px-Electron_Interaction_with_Matter.svg.png",
    //            "summary": "As the wavelength of an electron can be up to 100,000 times shorter than that of visible light photons, the electron microscope has a higher resolving power than a light microscope and can reveal the structure of smaller objects.A transmission electron microscope can achieve better than 50\u00a0pm resolution[1] and magnifications of up to about 10,000,000x whereas most light microscopes are limited by diffraction to about 200\u00a0nm resolution and useful magnifications below 2000x.Electron microscopes are used to investigate the ultrastructure of a wide range of biological and inorganic specimens including microorganisms, cells, large molecules, biopsy samples, metals, and crystals.The original form of electron microscope, the transmission electron microscope (TEM) uses a high voltage electron beam to create an image.",
    //            "title": "Electron microscope - Wikipedia, the free encyclopedia",
    //            "website": "https://en.wikipedia.org/wiki/Electron_microscope",
    //            "year": null
    //  },
    //        {
    //            "citations": null,
    //            "citations_list": null,
    //            "picture": "http://images.clipartpanda.com/electron-clipart-electron.png",
    //            "summary": "Senti: Sorry I couldn't find enough text to sumamrize ! ",
    //            "title": "Electron 20clipart | Clipart Panda - Free Clipart Images",
    //            "website": "http://www.clipartpanda.com/categories/electron-20clipart",
    //            "year": null
    //  }
    //];

    $scope.dataArray = [];



    $scope.add = function (id, item) {
        var temp = firepad.getHtml();
        temp = temp + " " + item.summary + " " + item.cit + ".";
        firepad.setHtml(temp);


        var elem = document.getElementById("card " + id);
        elem.classList = "card blue-grey lighten-2";

    }
    $scope.addImage = function (id, item) {
        var temp = firepad.getHtml()
        temp = temp + '<img src="' + item.picture + '" alt="" height = 200vh;>' + "<br>" + item.summary;
        firepad.setHtml(temp);

        var elem = document.getElementById("card image " + id);
        elem.classList = "card blue-grey lighten-2";

    }

    firepad.on('ready', function () {

        input = firepad.getText();

        $.post("http://72e1ec28.ngrok.io/extract", {
                content: input,
            })
            .done(function (data) {
                $scope.dataArray = data;
                $scope.$apply();
                console.log(data[1].title);

            });


        setInterval(function () {

            data = firepad.getText();

            $.post("http://72e1ec28.ngrok.io/extract", {
                    content: data,
                })
                .done(function (data) {
                    $scope.dataArray = data;
                    console.log(data);

                    $scope.$apply();

                });

        }, 10000);


    });


});