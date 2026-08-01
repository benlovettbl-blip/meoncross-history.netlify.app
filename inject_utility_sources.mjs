import fs from 'fs';
import path from 'path';

const sourcesData = {
    "lesson_1_2": {
        enquiry: "early challenges to the Weimar Republic, 1919-23",
        sources: [
            {
                type: "written",
                title: "Source A: An extract from the Treaty of Versailles, signed 28 June 1919. This is Article 231.",
                content: "\"The Allied and Associated Governments affirm and Germany accepts the responsibility of Germany and her allies for causing all the loss and damage to which the Allied and Associated Governments and their nationals have been subjected as a consequence of the war imposed upon them by the aggression of Germany and her allies.\"",
                provenance_clue: "Think about who wrote this treaty (the victorious Allies). Why would they want to force Germany to accept full responsibility? What does this mean they could then demand from Germany?"
            },
            {
                type: "visual",
                title: "Source B: A photograph showing Freikorps soldiers during the Kapp Putsch in Berlin, March 1920.",
                source: "/images/kapp_putsch_freikorps.jpg",
                caption: "Freikorps troops occupying Berlin during the Kapp Putsch.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Kapp_Putsch&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "Photographs can show the reality of a situation. Consider the heavy armament of these soldiers on the streets of the capital. Does this suggest the Weimar government was in control?"
            }
        ]
    },
    "lesson_1_3": {
        enquiry: "the recovery of the Republic, 1924-29",
        sources: [
            {
                type: "written",
                title: "Source A: Gustav Stresemann speaking to the League of Nations, 1926.",
                content: "\"It is my firm belief that the terrible events of the World War have produced a new spirit... We cannot conceal from ourselves that there is still much which divides the nations, but we must reach a state of mutual understanding.\"",
                provenance_clue: "Stresemann is addressing the international community here. How might his audience and his motive (trying to reintegrate Germany into world affairs) affect the tone of his speech?"
            },
            {
                type: "visual",
                title: "Source B: A 50-Million Mark banknote from 1923, before the introduction of the Rentenmark.",
                source: "/images/weimar_hyperinflation_note.jpg",
                caption: "A 50 Million Mark banknote demonstrating hyperinflation.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Hyperinflation_in_the_Weimar_Republic&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "This is a physical artefact from the crisis. Think about what a banknote of this denomination tells you about the daily lives and savings of ordinary Germans."
            }
        ]
    },
    "lesson_1_4": {
        enquiry: "changes in society during the Weimar Republic, 1924-29",
        sources: [
            {
                type: "written",
                title: "Source A: An article from a German magazine in 1926 describing the 'New Woman'.",
                content: "\"The new woman has cut her hair short, wears practical clothes and goes out to work. She no longer wants to be confined to the kitchen and the nursery. She wants to be an equal partner in marriage and in society.\"",
                provenance_clue: "Magazines often sensationalize or focus on urban trends. Does this description of the 'New Woman' reflect the reality for all German women, especially those in rural or traditional areas?"
            },
            {
                type: "visual",
                title: "Source B: A photograph of the Bauhaus school building in Dessau, designed by Walter Gropius.",
                source: "/images/bauhaus_dessau.jpg",
                caption: "The Bauhaus building in Dessau, a symbol of Weimar's cultural innovation.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Bauhaus&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "The Bauhaus represents the cutting edge of modernist design. How useful is this building for showing the cultural shifts and modern attitudes taking root in Weimar Germany?"
            }
        ]
    },
    "lesson_2_1": {
        enquiry: "the early development of the Nazi Party, 1919-22",
        sources: [
            {
                type: "written",
                title: "Source A: Point 4 of the 25-Point Programme, published in February 1920.",
                content: "\"None but members of the nation may be citizens of the state. None but those of German blood... may be members of the nation. No Jew, therefore, may be a member of the nation.\"",
                provenance_clue: "This is the official founding document of the Nazi Party. Consider its purpose: it was designed to appeal to nationalist and anti-Semitic feelings to gain early political support."
            },
            {
                type: "visual",
                title: "Source B: A photograph of Adolf Hitler addressing a crowd in Munich in the early 1920s.",
                source: "/images/hitler_munich_1920s.jpg",
                caption: "Hitler using his oratory skills to build support in Munich.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Adolf_Hitler&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "Photographs of speeches show the emotion and scale of early Nazi meetings. How useful is this for understanding why Hitler's leadership was so crucial to the party's early growth?"
            }
        ]
    },
    "lesson_2_2": {
        enquiry: "the Munich Putsch and the Lean Years, 1923-29",
        sources: [
            {
                type: "written",
                title: "Source A: Adolf Hitler speaking at his trial for treason, February 1924.",
                content: "\"I alone bear the responsibility. But I am not a criminal because of that... There is no such thing as high treason against the traitors of 1918. I consider myself not a traitor, but a German, who wanted the best for his people.\"",
                provenance_clue: "Hitler is on trial for a failed armed rebellion. Why might he use the courtroom as a platform to give a speech like this? Think about his audience beyond the judge."
            },
            {
                type: "visual",
                title: "Source B: A photograph of the defendants of the Munich Putsch trial, including Hitler and Ludendorff, 1924.",
                source: "/images/munich_putsch_defendants.jpg",
                caption: "Hitler, Ludendorff, and other leaders during the Munich Putsch trial.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Beer_Hall_Putsch&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "This photograph shows the accused posing confidently. Does it suggest they were treated harshly by the sympathetic right-wing judges in Bavaria?"
            }
        ]
    },
    "lesson_2_3": {
        enquiry: "the growth of Nazi support, 1929-32",
        sources: [
            {
                type: "written",
                title: "Source A: A diary entry by a German middle-class teacher, 1931.",
                content: "\"The economic situation is terrifying. Unemployment is rising every week. The Weimar politicians do nothing but argue. Many of my friends are turning to the National Socialists because they promise strong leadership and a way out of this misery.\"",
                provenance_clue: "This is a private diary entry, meaning the author is likely being honest about their feelings. How does it reveal the psychological impact of the Great Depression on middle-class voters?"
            },
            {
                type: "visual",
                title: "Source B: A Nazi election poster from 1932. The caption reads 'Our Last Hope: Hitler'.",
                source: "/images/nazi_poster_our_last_hope.jpg",
                caption: "A famous Nazi propaganda poster aimed at millions of unemployed Germans.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Nazi_propaganda&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "Propaganda posters are designed to manipulate emotions. Think about the desperation of the figures in the poster and how the Nazis presented Hitler as a saviour."
            }
        ]
    },
    "lesson_2_4": {
        enquiry: "how Hitler became Chancellor, 1932-33",
        sources: [
            {
                type: "written",
                title: "Source A: A comment by Franz von Papen to a conservative friend in January 1933.",
                content: "\"We have hired him! Within two months we will have pushed Hitler so far into a corner that he'll squeak.\"",
                provenance_clue: "Papen is boasting in private about his political scheming. What does this tell you about the arrogant underestimation of Hitler by the conservative elites?"
            },
            {
                type: "visual",
                title: "Source B: A photograph of Paul von Hindenburg and Adolf Hitler on the day Hitler was appointed Chancellor, 30 January 1933.",
                source: "/images/hitler_hindenburg_1933.jpg",
                caption: "President Hindenburg and the newly appointed Chancellor Adolf Hitler.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Adolf_Hitler's_rise_to_power&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "Look closely at the body language between the two men. Hindenburg despised Hitler. How useful is this photograph for showing the uneasy alliance that brought Hitler to power?"
            }
        ]
    },
    "lesson_3_1": {
        enquiry: "the creation of a dictatorship, 1933-34",
        sources: [
            {
                type: "written",
                title: "Source A: Extract from the 'Decree for the Protection of the People and the State' (Reichstag Fire Decree), 28 February 1933.",
                content: "\"Restrictions on personal liberty, on the right of free expression of opinion, including freedom of the press, on the right of assembly and the right of association, and violations of the privacy of postal, telegraphic, and telephonic communications... are permissible.\"",
                provenance_clue: "This is an official government decree passed immediately after the Reichstag Fire. How useful is it for showing how quickly Hitler established a legal basis for a dictatorship?"
            },
            {
                type: "visual",
                title: "Source B: A photograph showing the ruins of the Reichstag building after the fire, February 1933.",
                source: "/images/reichstag_fire_ruins.jpg",
                caption: "The devastated interior of the Reichstag building.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Reichstag_fire&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "While the photograph shows the physical destruction, does it tell you anything about who actually started the fire or how the Nazis used it to their advantage?"
            }
        ]
    },
    "lesson_3_2": {
        enquiry: "the Police State and religion, 1933-39",
        sources: [
            {
                type: "written",
                title: "Source A: A secret report by a Gestapo agent in Leipzig, 1937.",
                content: "\"The mood of the population is marked by a deep-seated fear of being denounced. People are very careful about what they say in public spaces or even to acquaintances, as the network of informers is believed to be everywhere.\"",
                provenance_clue: "This is an internal, secret report by the Gestapo. Why might a secret report be more reliable than a public Nazi broadcast about the happiness of the German people?"
            },
            {
                type: "visual",
                title: "Source B: A photograph of prisoners at the Dachau concentration camp during roll call, 1938.",
                source: "/images/dachau_roll_call.jpg",
                caption: "Prisoners standing at attention in Dachau, the first Nazi concentration camp.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Dachau_concentration_camp&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "This photograph may have been taken by the SS. Consider why they would take photographs of the camps—was it for documentation, or to create a climate of fear among the public?"
            }
        ]
    },
    "lesson_3_3": {
        enquiry: "controlling and influencing attitudes, 1933-39",
        sources: [
            {
                type: "written",
                title: "Source A: A speech by Joseph Goebbels to radio directors, March 1933.",
                content: "\"The radio will become the most important instrument of mass influence that has ever existed... We make no secret of it: the radio belongs to us, and to no one else. We will place the radio at the service of our ideology.\"",
                provenance_clue: "Goebbels is speaking directly to the people who control broadcasting. What does his bluntness tell you about the Nazi intent to completely dominate public information?"
            },
            {
                type: "visual",
                title: "Source B: A photograph of the Nuremberg Rallies, showing thousands of SA and SS men marching.",
                source: "/images/nuremberg_rally.jpg",
                caption: "The mass spectacle of the annual Nazi Party rally in Nuremberg.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Nuremberg_rally&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "This photograph is official Nazi propaganda. It is designed to show overwhelming unity and strength. How does this limit its usefulness for understanding the true feelings of ordinary Germans?"
            }
        ]
    },
    "lesson_3_4": {
        enquiry: "opposition, resistance and conformity, 1933-39",
        sources: [
            {
                type: "written",
                title: "Source A: An extract from a sermon by Pastor Martin Niemöller, 1937.",
                content: "\"We have no more thought of using our own powers to escape the arm of the authorities than had the Apostles of old. No more are we ready to keep silent at man's behest when God commands us to speak.\"",
                provenance_clue: "Niemöller was giving a public sermon defying the Nazi regime. Consider the courage required to speak out publicly. Does this source prove that religious resistance was widespread?"
            },
            {
                type: "visual",
                title: "Source B: A photograph of Edelweiss Pirates graffiti found on a wall in Cologne, late 1930s.",
                source: "/images/edelweiss_pirates_graffiti.jpg",
                caption: "Anti-Hitler Youth graffiti left by the Edelweiss Pirates.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Edelweiss_Pirates&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "Graffiti is an anonymous form of protest. Why might young people have to resort to graffiti to express their opposition to the regime?"
            }
        ]
    },
    "lesson_4_1": {
        enquiry: "Nazi policies towards women, 1933-39",
        sources: [
            {
                type: "written",
                title: "Source A: Extract from a speech by Hitler to the National Socialist Women's Organisation, 1934.",
                content: "\"The slogan 'Emancipation of women' was invented by Jewish intellectuals... Her world is her husband, her family, her children, and her home. We do not consider it correct for the woman to interfere in the world of the man.\"",
                provenance_clue: "This is a public speech by Hitler outlining official policy. How useful is it for understanding the ideological goals the Nazis had for women?"
            },
            {
                type: "visual",
                title: "Source B: A photograph of a German mother receiving the Honour Cross of the German Mother (Mother's Cross).",
                source: "/images/mothers_cross_award.jpg",
                caption: "A German mother is awarded the Mother's Cross for having a large family.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Cross_of_Honour_of_the_German_Mother&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "The Mother's Cross was part of a major propaganda drive. Does a photograph of an award ceremony tell us whether ordinary women genuinely agreed with Nazi policies?"
            }
        ]
    },
    "lesson_4_2": {
        enquiry: "Nazi policies towards the young, 1933-39",
        sources: [
            {
                type: "written",
                title: "Source A: A former member of the Hitler Youth recalling his experiences in a post-war interview.",
                content: "\"We were constantly marching, singing, and listening to lectures about the greatness of the Führer. At first it was exciting, the camping and the sports. But by the time I was 15, it became exhausting and militarily strict.\"",
                provenance_clue: "This is a retrospective interview from after the war. How might knowing the catastrophic outcome of the war affect how the author remembers his youth?"
            },
            {
                type: "visual",
                title: "Source B: A photograph showing members of the League of German Girls (BDM) doing gymnastics, 1936.",
                source: "/images/bdm_gymnastics.jpg",
                caption: "Physical education was a core component of the BDM curriculum.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=League_of_German_Girls&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "This photograph is likely an official press release. Why would the Nazis want to project an image of healthy, athletic young girls to the German public?"
            }
        ]
    },
    "lesson_4_3": {
        enquiry: "employment and living standards, 1933-39",
        sources: [
            {
                type: "written",
                title: "Source A: A report by the secret socialist opposition group (Sopade) smuggled out of Germany, 1938.",
                content: "\"The workers are complaining about the rising cost of living and the fact that wages are frozen. Although unemployment has disappeared, the working hours are long and the pace of work in the munitions factories is grueling.\"",
                provenance_clue: "This report comes from an illegal socialist opposition group. They have a motive to highlight the negative aspects of Nazi rule. How does this affect its usefulness compared to official Nazi statistics?"
            },
            {
                type: "visual",
                title: "Source B: A photograph of workers constructing the Autobahn, 1935.",
                source: "/images/autobahn_construction.jpg",
                caption: "Manual labourers building the new German motorway network.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Reichsautobahn&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "Photographs of the Autobahn were used heavily in propaganda to prove Hitler was fulfilling his promise of 'work and bread'. Does this image tell us about the wages or working conditions of these men?"
            }
        ]
    },
    "lesson_4_4": {
        enquiry: "the persecution of minorities, 1933-39",
        sources: [
            {
                type: "written",
                title: "Source A: An extract from the Nuremberg Laws, 15 September 1935.",
                content: "\"Marriages between Jews and subjects of the state of German or related blood are forbidden. Extramarital intercourse between Jews and subjects of the state of German or related blood is forbidden.\"",
                provenance_clue: "This is official legislation passed by the Reichstag. How useful is it for showing the institutionalization and legality of racism in the Nazi state?"
            },
            {
                type: "visual",
                title: "Source B: A photograph showing the destruction of a Jewish-owned shop in Berlin after Kristallnacht, November 1938.",
                source: "/images/kristallnacht_shop.jpg",
                caption: "A Jewish-owned business destroyed during the November Pogrom.",
                wikiUrl: "https://en.wikipedia.org/w/api.php?action=query&titles=Kristallnacht&prop=pageimages&format=json&pithumbsize=500",
                provenance_clue: "This photograph captures the physical aftermath of state-sponsored violence. Consider what it tells us about the escalation of persecution by 1938 compared to the earlier boycotts."
            }
        ]
    }
};

async function fetchWikiImage(wikiApiUrl, destPath) {
    if (fs.existsSync(destPath)) {
        console.log(`Already exists: ${destPath}`);
        return;
    }
    try {
        const response = await fetch(wikiApiUrl);
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        let imageUrl = null;
        if (pageId !== "-1" && pages[pageId].thumbnail) {
            imageUrl = pages[pageId].thumbnail.source;
        } else {
            console.log(`No thumbnail found for ${wikiApiUrl}, falling back to default image search`);
            const title = new URL(wikiApiUrl).searchParams.get('titles');
            const fallbackUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=images&format=json`;
            const fallRes = await fetch(fallbackUrl);
            const fallData = await fallRes.json();
            const fallPages = fallData.query.pages;
            const fPageId = Object.keys(fallPages)[0];
            if (fPageId !== "-1" && fallPages[fPageId].images && fallPages[fPageId].images.length > 0) {
                 const filename = fallPages[fPageId].images[0].title;
                 const fileInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
                 const fiRes = await fetch(fileInfoUrl);
                 const fiData = await fiRes.json();
                 const fiPages = fiData.query.pages;
                 const fiPageId = Object.keys(fiPages)[0];
                 if (fiPages[fiPageId].imageinfo && fiPages[fiPageId].imageinfo.length > 0) {
                     imageUrl = fiPages[fiPageId].imageinfo[0].url;
                 }
            }
        }

        if (imageUrl) {
            const imgRes = await fetch(imageUrl);
            const arrayBuffer = await imgRes.arrayBuffer();
            fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
            console.log(`Downloaded image to ${destPath}`);
        } else {
            console.error(`Could not resolve image for ${wikiApiUrl}`);
            // Create a dummy image or fallback
            fs.writeFileSync(destPath, Buffer.from(''));
        }
    } catch (e) {
        console.error(`Error fetching image for ${destPath}: ${e.message}`);
    }
}

async function run() {
    const dataPath = path.join(process.cwd(), 'weimar_nazi_germany', 'data.js');
    let raw = fs.readFileSync(dataPath, 'utf-8');

    const prefix = 'export const unitData = ';
    let jsonString = raw.substring(prefix.length).trim();
    if (jsonString.endsWith(';')) jsonString = jsonString.slice(0, -1);

    const data = JSON.parse(jsonString);

    for (const [lessonId, sources] of Object.entries(sourcesData)) {
        const lesson = data.lessons.find(l => l.id === lessonId);
        if (lesson) {
            // Inject utility starters
            lesson.utility_starters = {
                enquiry: sources.enquiry,
                sources: sources.sources.map(s => {
                    const { wikiUrl, ...rest } = s;
                    return rest;
                })
            };
            console.log(`Injected utility starters for ${lessonId}`);

            // Fetch images
            for (const s of sources.sources) {
                if (s.type === 'visual' && s.wikiUrl) {
                    const destPath = path.join(process.cwd(), 'public', s.source);
                    await fetchWikiImage(s.wikiUrl, destPath);
                }
            }
        }
    }

    const outString = prefix + JSON.stringify(data, null, 4) + ';\n';
    fs.writeFileSync(dataPath, outString, 'utf-8');
    console.log('All utility starters injected and data.js updated.');
}

run();
