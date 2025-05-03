import React from "react";
import './imprint.scss';
import { useNavigate } from "react-router-dom";

const Imprint = () => {
    const navigate = useNavigate();

    const backToMain=()=>{
        navigate('/');
    }

    return (
        <div className="imprint">
            <h1>Impressum</h1>

            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
                Johannes Roth<br />
                Max-Seither-Ring 32<br />
                76863 Herxheim<br />
                Deutschland
            </p>

            <h2>Kontakt</h2>
            <p>
                Telefon: +49 151 41 292919<br />
                E-Mail: <a href="mailto:info@maple-websolutions.de">info@maple-websolutions.de</a>
            </p>

            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
               Johannes Roth<br />
                Adresse wie oben
            </p>

            <h2>Haftungsausschluss</h2>
            <p>
                Die Inhalte dieser App wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>

            <h2>Urheberrecht</h2>
            <p>
                Die durch den App-Anbieter erstellten Inhalte und Werke in dieser Anwendung unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
            </p>

            <h2>Datenschutz</h2>
            <p>
                Es werden keine personenbezogenen Daten ohne ausdrückliche Zustimmung verarbeitet oder gespeichert.
            </p>

            <h2>Online-Streitbeilegung</h2>
            <p>
                Plattform der EU-Kommission zur Online-Streitbeilegung:
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                    https://ec.europa.eu/consumers/odr
                </a>
            </p>
           <div className="backBtn">
            <button onClick={backToMain}>zurück</button>
           </div>
        </div>
    )
}
export default Imprint