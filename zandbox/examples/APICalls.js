const fetch = require("node-fetch");

class APICalls {

    name = () => console.log('Service Name:', this.constructor.name);

    getSpacePeople = () => {
        let astros = fetch('http://api.open-notify.org/astros.json')
            .then((res) => res.json())
            .catch((err) => console.log('#Fetch Error -', err));

        return astros;
    }

    spaceNames = () => {
        let names = this.getSpacePeople()
            .then((data) => data.people)
            .then((people) => people.map((p) => p.name))
            .then((names => names.join(", ")))
            .then(console.log)
            .catch((err) => console.log('#Get API Error -', err));
            
        return names;
    }

    githubRequest = async (login) => {
        let response = await fetch(`https://api.github.com/users/${login}`);
        let json = await response.json();
        let summary = console.log(`${json.name}, ${json.company}, ${json.location}`);

        return summary;
           
    }
}

module.exports = APICalls;
