import type { AccentKey, Avatar } from './avatars'

export interface Choice {
  id: string
  text: string
  isBiased: boolean
  outcomeLabel: string
}

export interface Reveal {
  outcome: { biased: string; unbiased: string }
  biasExplanation: string
  tip: string
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface CharacterVariant {
  scenario?: string
  choices?: Choice[]
  reveal?: Partial<Reveal>
  coachingLine: string
}

export interface RoomVariant {
  variantId: string
  difficulty: Difficulty
  scenario: string
  choices: Choice[]
  reveal: Reveal
  coachingLine?: string
  avatarOverrides?: Partial<Record<AccentKey, CharacterVariant>>
}

export interface BiasRoom {
  id: string
  title: string
  bias: string
  roomIcon: string
  variants: Record<Difficulty, RoomVariant>
}

// Flat shape consumed by screens. Built from a BiasRoom + RoomVariant + optional Avatar.
export interface Room {
  id: string
  title: string
  bias: string
  roomIcon: string
  scenario: string
  choices: Choice[]
  reveal: Reveal
  coachingLine?: string
  variantId: string
  difficulty: Difficulty
}

export function resolveRoom(
  biasRoom: BiasRoom,
  variant: RoomVariant,
  avatar: Avatar | null,
): Room {
  const override = avatar ? variant.avatarOverrides?.[avatar.id] : undefined

  const choices = override?.choices ?? variant.choices
  const scenario = override?.scenario ?? variant.scenario
  const reveal: Reveal = {
    outcome: {
      ...variant.reveal.outcome,
      ...override?.reveal?.outcome,
    },
    biasExplanation:
      override?.reveal?.biasExplanation ?? variant.reveal.biasExplanation,
    tip: override?.reveal?.tip ?? variant.reveal.tip,
  }
  const coachingLine = override?.coachingLine ?? variant.coachingLine

  return {
    id: biasRoom.id,
    title: biasRoom.title,
    bias: biasRoom.bias,
    roomIcon: biasRoom.roomIcon,
    scenario,
    choices,
    reveal,
    coachingLine,
    variantId: variant.variantId,
    difficulty: variant.difficulty,
  }
}

export const ROOMS: BiasRoom[] = [
  {
    id: 'fake-sale-chamber',
    title: 'Fake Sale Chamber',
    bias: 'Anchoring',
    roomIcon: 'SALE',
    variants: {
      easy: {
        variantId: 'anchoring-easy',
        difficulty: 'easy',
        scenario:
          'A pair of headphones is on sale for €120. The page screams "WAS €300 — 60% OFF!". You only came to browse, but suddenly it feels like a steal you cannot pass up.',
        choices: [
          {
            id: 'buy',
            text: 'Grab them. €180 off is too good to miss.',
            isBiased: true,
            outcomeLabel: 'You bought them',
          },
          {
            id: 'compare',
            text: 'Open another tab and check the real market price first.',
            isBiased: false,
            outcomeLabel: 'You checked first',
          },
          {
            id: 'leave',
            text: 'Close the tab. You did not need them anyway.',
            isBiased: false,
            outcomeLabel: 'You walked away',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'Two stores away the same headphones sit at €115 with no fake "before" price. Your "€180 saved" was a number on a sticker.',
            unbiased:
              'A quick search shows the same model at €115 elsewhere. The "€300" was never the real price — just bait.',
          },
          biasExplanation:
            'Anchoring is when the first number you see secretly sets your reference point. Stores plant a high "original price" so any number below it feels like a win, even when the deal is just average.',
          tip: 'Compare against the true market price, not the first number on the page.',
        },
        avatarOverrides: {
          explorer: {
            scenario:
              'A limited-time headphone deal flashes €120, down from €300. The countdown clock is moving fast, and your instinct says decisive players do not hesitate.',
            choices: [
              {
                id: 'strike-now',
                text: 'Buy now before the clock runs out.',
                isBiased: true,
                outcomeLabel: 'You struck fast',
              },
              {
                id: 'price-check',
                text: 'Take two minutes to check the real price elsewhere.',
                isBiased: false,
                outcomeLabel: 'You checked the field',
              },
              {
                id: 'cooldown',
                text: 'Set a ten-minute cooldown before buying anything unplanned.',
                isBiased: false,
                outcomeLabel: 'You cooled the move',
              },
            ],
            coachingLine:
              'Explorer move: speed is useful after you know the target, not before.',
          },
          spark: {
            scenario:
              'A creator you like calls these €120 headphones the deal of the week. The old €300 price makes the story feel even better, and the comments are excited.',
            choices: [
              {
                id: 'join-hype',
                text: 'Join the hype and buy while everyone is talking about it.',
                isBiased: true,
                outcomeLabel: 'You followed the hype',
              },
              {
                id: 'compare-hype',
                text: 'Check two stores before letting the buzz decide.',
                isBiased: false,
                outcomeLabel: 'You checked beyond the buzz',
              },
              {
                id: 'ask-need',
                text: 'Ask whether you wanted headphones before the post appeared.',
                isBiased: false,
                outcomeLabel: 'You checked the need',
              },
            ],
            coachingLine:
              'Spark move: let enthusiasm point at an option, then let evidence decide.',
          },
          guardian: {
            scenario:
              'Your old headphones still work, but this €120 pair claims it used to cost €300. It feels practical to buy the safer, better version before your current pair fails.',
            choices: [
              {
                id: 'buy-backup',
                text: 'Buy them as a sensible backup.',
                isBiased: true,
                outcomeLabel: 'You bought the backup',
              },
              {
                id: 'check-need',
                text: 'Check the current market price and whether you need a backup.',
                isBiased: false,
                outcomeLabel: 'You checked need and price',
              },
              {
                id: 'repair-plan',
                text: 'Keep using what works and note what replacement would actually cost.',
                isBiased: false,
                outcomeLabel: 'You made a replacement plan',
              },
            ],
            coachingLine:
              'Guardian move: safe choices still need a real baseline, not a planted price.',
          },
          strategist: {
            scenario:
              'The product page lists €300 crossed out, €120 today, and a clean comparison chart. The numbers look precise, but you do not know whether €300 was ever real.',
            choices: [
              {
                id: 'trust-chart',
                text: 'Trust the chart and treat €120 as a measured bargain.',
                isBiased: true,
                outcomeLabel: 'You trusted the chart',
              },
              {
                id: 'audit-price',
                text: 'Audit the price history and compare the same model elsewhere.',
                isBiased: false,
                outcomeLabel: 'You audited the anchor',
              },
              {
                id: 'set-value',
                text: 'Decide what the headphones are worth to you before reading the discount.',
                isBiased: false,
                outcomeLabel: 'You set your own value',
              },
            ],
            coachingLine:
              'Strategist move: precise numbers can still be decoration unless you verify the source.',
          },
        },
      },
      medium: {
        variantId: 'anchoring-medium',
        difficulty: 'medium',
        scenario:
          'A used 2-year-old laptop on a marketplace lists at €650. The seller posts the original receipt for €1,400 alongside it. You needed a laptop anyway, and "less than half of retail" feels like solid value.',
        choices: [
          {
            id: 'lock-in',
            text: 'Lock it in. The receipt proves it is genuinely 50%+ off.',
            isBiased: true,
            outcomeLabel: 'You locked it in',
          },
          {
            id: 'check-secondhand',
            text: 'Look up what 2-year-old versions of this model sell for right now.',
            isBiased: false,
            outcomeLabel: 'You checked the secondhand rate',
          },
          {
            id: 'cover-receipt',
            text: 'Decide what you would pay if the receipt did not exist.',
            isBiased: false,
            outcomeLabel: 'You set your own number',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'The same model is going for around €550 on the secondhand market. The €1,400 receipt anchored you to a price that no longer applies — you paid the seller a tax for keeping the paperwork.',
            unbiased:
              'You found the going rate is closer to €550 and either negotiated down or found a cleaner listing. The original receipt was history, not value.',
          },
          biasExplanation:
            'Anchoring works hardest when the anchor looks like proof. An old receipt or "MSRP" feels like evidence, but used goods are priced by today\'s market — not what they cost two years ago.',
          tip: 'Old receipts are anchors, not values. Price against the current market for the same condition.',
        },
      },
      hard: {
        variantId: 'anchoring-hard',
        difficulty: 'hard',
        scenario:
          'You are negotiating salary for a new role. You researched a market range of €68k–€82k. The recruiter opens with €72k. It is inside your range and feels like a fair, reasonable place to start — and end.',
        choices: [
          {
            id: 'accept',
            text: 'Accept €72k. It is inside the band you expected.',
            isBiased: true,
            outcomeLabel: 'You accepted the open',
          },
          {
            id: 'counter-high',
            text: 'Counter at the upper end of your range, tied to the role\'s scope.',
            isBiased: false,
            outcomeLabel: 'You countered with reasoning',
          },
          {
            id: 'anchor-first',
            text: 'Note the lesson: next time, share your range before they share theirs.',
            isBiased: false,
            outcomeLabel: 'You anchored first',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'You took the first number inside your range. The recruiter expected to settle near €78k and was quietly surprised you did not push. €6k a year, every year, sat on the table.',
            unbiased:
              'You countered at €80k with scope-based reasoning and landed at €77k. The first number stopped framing the outcome.',
          },
          biasExplanation:
            'Anchoring is most dangerous when the anchor is reasonable. A first offer inside your range feels fair — but "fair" was defined by them. The first number sets the conversation\'s gravity even when nobody is being aggressive.',
          tip: 'A reasonable first offer is still an anchor. Ask whether the number frames a ceiling or a floor.',
        },
      },
    },
  },
  {
    id: 'viral-panic-hall',
    title: 'Viral Panic Hall',
    bias: 'Availability bias',
    roomIcon: 'FEED',
    variants: {
      easy: {
        variantId: 'availability-easy',
        difficulty: 'easy',
        scenario:
          'Your feed is full of one dramatic story: a stranger taking a parcel from a porch in another city. You have a delivery coming today and suddenly feel sure it will be stolen.',
        choices: [
          {
            id: 'panic',
            text: 'Cancel the order. It is clearly not safe to ship anything anymore.',
            isBiased: true,
            outcomeLabel: 'You cancelled',
          },
          {
            id: 'lookup',
            text: 'Look up how often porch theft actually happens in your area.',
            isBiased: false,
            outcomeLabel: 'You checked the data',
          },
          {
            id: 'note',
            text: 'Send the parcel as planned, ask the carrier to leave it out of sight.',
            isBiased: false,
            outcomeLabel: 'You shipped with a small precaution',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'You cancelled an order you actually wanted because of one viral video. The risk in your neighborhood was tiny.',
            unbiased:
              'The data shows porch theft is rare where you live. One vivid story made a small risk feel huge for a moment.',
          },
          biasExplanation:
            'Availability bias is when easy-to-recall examples feel common, even when they are rare. Vivid, emotional stories stick in memory and your brain treats "easy to imagine" as "likely to happen".',
          tip: 'Before reacting, ask: "How often does this actually happen?" Look up the base rate.',
        },
        avatarOverrides: {
          explorer: {
            scenario:
              'A viral parcel-theft clip hits your feed right before your delivery arrives. Your first instinct is to make a strong call and cancel the whole order.',
            choices: [
              {
                id: 'cancel-fast',
                text: 'Cancel it now. Better to act than get burned.',
                isBiased: true,
                outcomeLabel: 'You cancelled fast',
              },
              {
                id: 'check-rate',
                text: 'Check local theft rates before making a big move.',
                isBiased: false,
                outcomeLabel: 'You checked the rate',
              },
              {
                id: 'small-fix',
                text: 'Keep the order and add a delivery note for a hidden spot.',
                isBiased: false,
                outcomeLabel: 'You made a small fix',
              },
            ],
            coachingLine:
              'Explorer move: match the size of your action to the size of the real risk.',
          },
          spark: {
            scenario:
              'Everyone is sharing the same dramatic porch-theft video. The comments are intense, and the story is so vivid it feels like it could happen to you today.',
            choices: [
              {
                id: 'share-panic',
                text: 'Share the warning and cancel your delivery too.',
                isBiased: true,
                outcomeLabel: 'You spread the panic',
              },
              {
                id: 'ask-frequency',
                text: 'Ask how often this happens near you before reacting.',
                isBiased: false,
                outcomeLabel: 'You asked for frequency',
              },
              {
                id: 'mute-check',
                text: 'Step away from the thread and check the carrier options.',
                isBiased: false,
                outcomeLabel: 'You left the thread',
              },
            ],
            coachingLine:
              'Spark move: a story can be memorable without being representative.',
          },
          guardian: {
            scenario:
              'A neighbor group is worried after one porch-theft video goes around. You want to protect your home and avoid making anyone feel ignored.',
            choices: [
              {
                id: 'cancel-peace',
                text: 'Cancel the delivery so everyone feels safer.',
                isBiased: true,
                outcomeLabel: 'You chose the safest-feeling option',
              },
              {
                id: 'local-info',
                text: 'Check local reports and suggest a simple delivery precaution.',
                isBiased: false,
                outcomeLabel: 'You grounded the worry',
              },
              {
                id: 'reassure-plan',
                text: 'Keep the delivery and ask a neighbor to bring it inside.',
                isBiased: false,
                outcomeLabel: 'You made a calm plan',
              },
            ],
            coachingLine:
              'Guardian move: caring for people includes helping the group see the real scale of a risk.',
          },
          strategist: {
            scenario:
              'A viral theft story is everywhere, but the clip gives no location, frequency, or context. Your delivery is due today, and the missing data is annoying.',
            choices: [
              {
                id: 'assume-trend',
                text: 'Treat the clip as evidence of a bigger trend and cancel.',
                isBiased: true,
                outcomeLabel: 'You assumed a trend',
              },
              {
                id: 'find-base-rate',
                text: 'Look for local base rates and delivery failure data.',
                isBiased: false,
                outcomeLabel: 'You found the base rate',
              },
              {
                id: 'risk-control',
                text: 'Keep the order and reduce the specific risk with delivery instructions.',
                isBiased: false,
                outcomeLabel: 'You controlled the risk',
              },
            ],
            coachingLine:
              'Strategist move: if a story lacks a denominator, it is not enough data yet.',
          },
        },
      },
      medium: {
        variantId: 'availability-medium',
        difficulty: 'medium',
        scenario:
          'Three coworkers in the last month have mentioned getting card details skimmed at gas pumps in your city. You are filling up tomorrow morning.',
        choices: [
          {
            id: 'go-cash',
            text: 'Switch to cash for fuel from now on. The pattern is clear.',
            isBiased: true,
            outcomeLabel: 'You switched to cash',
          },
          {
            id: 'check-policy',
            text: 'Check the city fraud rate and your card\'s zero-liability policy first.',
            isBiased: false,
            outcomeLabel: 'You checked the policy',
          },
          {
            id: 'visual-check',
            text: 'Cover the keypad and check the pump\'s tamper seal — small precautions that actually help.',
            isBiased: false,
            outcomeLabel: 'You took a real precaution',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'You took on cash-handling hassle for a risk that is tiny per transaction. Three stories from your circle is not a base rate — and the bank would have refunded any fraud anyway.',
            unbiased:
              'You learned the actual incidence is roughly 1 per few thousand fillups, your card refunds fraud, and a quick visual seal-check covers most of the real risk.',
          },
          biasExplanation:
            'Availability bias gets sneakier when the source is your own circle. A cluster of stories from people you know feels like a trend, but three coworkers are not a sample — they are three points without a denominator.',
          tip: 'A cluster of stories from your circle is not a denominator. Find the actual rate before changing your defaults.',
        },
      },
      hard: {
        variantId: 'availability-hard',
        difficulty: 'hard',
        scenario:
          'After a high-profile plane crash, you are booking a holiday. The flight is 3 hours, the drive 12. The crash was statistically rare and unrelated to your route, but it is still vivid in your mind.',
        choices: [
          {
            id: 'drive-instead',
            text: 'Drive instead. Why take any flight risk right now?',
            isBiased: true,
            outcomeLabel: 'You drove',
          },
          {
            id: 'fly-anyway',
            text: 'Book the flight. Per-mile, flying is far safer than driving.',
            isBiased: false,
            outcomeLabel: 'You took the flight',
          },
          {
            id: 'name-the-feeling',
            text: 'Notice the discomfort, take the flight anyway, and let the feeling pass.',
            isBiased: false,
            outcomeLabel: 'You named the feeling',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'The 12-hour drive added measurably more risk per mile than the flight you skipped. Your gut traded a tiny risk for a larger one — and felt safer doing it.',
            unbiased:
              'You took the flight, the trip was uneventful, and the feeling passed within a day. The substitute you almost chose was the more dangerous option.',
          },
          biasExplanation:
            'Availability bias is hardest to spot when it makes you swap one risk for another. The new option does not get the same vivid scrutiny — your brain treats "less imaginable" as "less risky", even when the numbers say the opposite.',
          tip: 'When a vivid event makes you swap risks, check whether the substitute is actually safer per unit of exposure.',
        },
      },
    },
  },
  {
    id: 'gossip-mirror',
    title: 'Gossip Mirror',
    bias: 'Confirmation bias',
    roomIcon: 'RUMOR',
    variants: {
      easy: {
        variantId: 'confirmation-easy',
        difficulty: 'easy',
        scenario:
          'A friend tells you that your new coworker, Alex, is "kind of arrogant". You barely know Alex, but you already had a hunch they were a bit much. Tomorrow you have a 1:1 with them.',
        choices: [
          {
            id: 'agree',
            text: 'Go in already guarded. The rumor confirms what you suspected.',
            isBiased: true,
            outcomeLabel: 'You went in guarded',
          },
          {
            id: 'open',
            text: 'Show up curious. Try to hear Alex out without filtering.',
            isBiased: false,
            outcomeLabel: 'You stayed curious',
          },
          {
            id: 'check',
            text: 'Ask one more person who works closely with Alex for their take.',
            isBiased: false,
            outcomeLabel: 'You looked for other views',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'In the meeting you noticed only the moments that fit the story. You missed the parts where Alex was thoughtful and asked good questions.',
            unbiased:
              'Without the filter, you noticed Alex was direct but actually pretty considerate. The "arrogant" label fit one moment, not the whole person.',
          },
          biasExplanation:
            'Confirmation bias is when you notice and remember evidence that fits what you already believe and quietly skip the rest. A rumor that matches a hunch becomes "proof" without ever being tested.',
          tip: 'Look for one piece of evidence that would prove your view wrong before deciding it is right.',
        },
        avatarOverrides: {
          explorer: {
            scenario:
              'A friend says Alex is arrogant, and that matches your first read. You have a 1:1 tomorrow and want to decide quickly whether Alex is worth trusting.',
            choices: [
              {
                id: 'decide-now',
                text: 'Decide Alex is a problem and keep the meeting guarded.',
                isBiased: true,
                outcomeLabel: 'You decided early',
              },
              {
                id: 'test-view',
                text: 'Go in with one thing that could change your mind.',
                isBiased: false,
                outcomeLabel: 'You tested the view',
              },
              {
                id: 'direct-question',
                text: 'Ask direct questions and judge the answers, not the rumor.',
                isBiased: false,
                outcomeLabel: 'You judged the answers',
              },
            ],
            coachingLine:
              'Explorer move: fast reads improve when you decide what evidence would update them.',
          },
          spark: {
            scenario:
              "A juicy story about Alex spreads through chat. It fits your first impression, and the conversation is starting to shape how everyone sees tomorrow's 1:1.",
            choices: [
              {
                id: 'join-story',
                text: 'Join the story. Everyone seems to see the same thing.',
                isBiased: true,
                outcomeLabel: 'You joined the story',
              },
              {
                id: 'fresh-read',
                text: 'Meet Alex fresh and listen for details that do not fit the story.',
                isBiased: false,
                outcomeLabel: 'You listened fresh',
              },
              {
                id: 'slow-chat',
                text: 'Step out of the chat and form your own view after the meeting.',
                isBiased: false,
                outcomeLabel: 'You slowed the gossip',
              },
            ],
            coachingLine:
              'Spark move: connection is powerful, so protect it from turning one rumor into a group filter.',
          },
          guardian: {
            scenario:
              'A teammate warns you Alex is arrogant. You want to be kind to your teammate, but you also do not want to quietly treat Alex unfairly.',
            choices: [
              {
                id: 'side-with-team',
                text: 'Trust your teammate and keep Alex at a distance.',
                isBiased: true,
                outcomeLabel: 'You picked a side early',
              },
              {
                id: 'balanced-chance',
                text: 'Thank your teammate, then give Alex a fair first meeting.',
                isBiased: false,
                outcomeLabel: 'You stayed fair',
              },
              {
                id: 'ask-example',
                text: 'Ask for a concrete example instead of accepting the label.',
                isBiased: false,
                outcomeLabel: 'You asked for evidence',
              },
            ],
            coachingLine:
              'Guardian move: loyalty works best when it leaves room for people to surprise you.',
          },
          strategist: {
            scenario:
              'You hear Alex is arrogant, and you start mentally collecting data points. The risk is that every direct comment now looks like evidence for the same conclusion.',
            choices: [
              {
                id: 'collect-fit',
                text: 'Track every moment that confirms the arrogant label.',
                isBiased: true,
                outcomeLabel: 'You collected fitting evidence',
              },
              {
                id: 'counter-evidence',
                text: 'Track both confirming and disconfirming moments.',
                isBiased: false,
                outcomeLabel: 'You balanced the evidence',
              },
              {
                id: 'define-test',
                text: 'Define what would prove the label wrong before the meeting.',
                isBiased: false,
                outcomeLabel: 'You defined a fair test',
              },
            ],
            coachingLine:
              'Strategist move: evidence quality drops when you only count what fits the theory.',
          },
        },
      },
      medium: {
        variantId: 'confirmation-medium',
        difficulty: 'medium',
        scenario:
          'You are interviewing a candidate. Their cover letter has a typo. You start the conversation already noticing small things — and you find a couple. Two more interviews to go today.',
        choices: [
          {
            id: 'pass',
            text: 'Pass on them. The typo and the small slips fit the same picture.',
            isBiased: true,
            outcomeLabel: 'You passed',
          },
          {
            id: 'structured',
            text: 'Run the same structured questions as every other candidate and score the answers.',
            isBiased: false,
            outcomeLabel: 'You scored structured',
          },
          {
            id: 'flip-question',
            text: 'Ask one question whose strong answer would make you want to hire them.',
            isBiased: false,
            outcomeLabel: 'You asked a flip question',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'You filtered the interview through one early signal. A peer interviewer who never saw the cover letter rated the same candidate as a top pick.',
            unbiased:
              'The structured score put them in your top 3. The typo turned out to be irrelevant to the role.',
          },
          biasExplanation:
            'Confirmation bias hides inside expertise. Once you have a hunch, every ambiguous answer fits it — and "I just have a feel for candidates" sounds like skill, not bias.',
          tip: 'When you have already formed a hunch, plan the question whose answer would make you change your mind.',
        },
      },
      hard: {
        variantId: 'confirmation-hard',
        difficulty: 'hard',
        scenario:
          'You ran an A/B test on a design you championed. It lost overall by 1.2% conversion (p=0.18). You go back to the data and find a segment — mobile users — where it won by 3%.',
        choices: [
          {
            id: 'ship-segment',
            text: 'Ship the design. It works for the segment that matters.',
            isBiased: true,
            outcomeLabel: 'You shipped on the segment',
          },
          {
            id: 'pre-register',
            text: 'Pre-register the segment hypothesis and re-test before shipping.',
            isBiased: false,
            outcomeLabel: 'You pre-registered',
          },
          {
            id: 'accept-loss',
            text: 'Treat the overall loss as the answer and write up what you learned.',
            isBiased: false,
            outcomeLabel: 'You accepted the result',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'Six weeks after shipping, the mobile segment effect did not hold up in production. You had reverse-engineered a story from noise that happened to flatter your favorite hypothesis.',
            unbiased:
              'The pre-registered re-test came back null. You shipped the control and avoided a feature you would have had to roll back.',
          },
          biasExplanation:
            'Confirmation bias survives statistics if you let it. Searching for the slice where your favored design "works" is exactly how noise gets dressed up as a finding — and the more rigorous it looks, the harder it is to question.',
          tip: 'Slicing the data after you see the result is confirmation bias in a lab coat. Pre-register, or accept the headline number.',
        },
      },
    },
  },
  {
    id: 'oracle-route',
    title: 'Oracle Route',
    bias: 'Automation bias',
    roomIcon: 'MAP',
    variants: {
      easy: {
        variantId: 'automation-easy',
        difficulty: 'easy',
        scenario:
          'Your maps app routes you down a narrow road that looks closed. The cones and barrier in front of you say one thing, the calm voice in your phone says "continue straight for 200 metres".',
        choices: [
          {
            id: 'trust-app',
            text: 'Follow the app. It usually knows best.',
            isBiased: true,
            outcomeLabel: 'You followed the app',
          },
          {
            id: 'trust-eyes',
            text: 'Trust the cones. Take the next exit and reroute.',
            isBiased: false,
            outcomeLabel: 'You trusted your eyes',
          },
          {
            id: 'check-both',
            text: 'Stop, check the map manually for an alternative, then decide.',
            isBiased: false,
            outcomeLabel: 'You double-checked',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'The road really was closed. You ended up reversing past two cars and adding fifteen minutes to the trip.',
            unbiased:
              'You took a slightly longer route that was actually open and arrived without drama.',
          },
          biasExplanation:
            'Automation bias is when a confident system (an app, a model, an AI) makes you doubt evidence right in front of you. The clean voice sounds more reliable than the messy real world, even when it is wrong.',
          tip: 'Treat AI and apps as input, not authority. When reality disagrees with the screen, reality usually wins.',
        },
        avatarOverrides: {
          explorer: {
            scenario:
              'The maps app says continue straight, but cones block the road. You want to keep moving and hate losing time to second-guessing.',
            choices: [
              {
                id: 'push-through',
                text: 'Push forward. The app usually knows the fastest route.',
                isBiased: true,
                outcomeLabel: 'You pushed forward',
              },
              {
                id: 'reroute-now',
                text: 'Act on the cones and reroute immediately.',
                isBiased: false,
                outcomeLabel: 'You rerouted fast',
              },
              {
                id: 'quick-scan',
                text: 'Pull over for one quick scan, then choose the open road.',
                isBiased: false,
                outcomeLabel: 'You scanned and moved',
              },
            ],
            coachingLine:
              'Explorer move: decisive action works best when it responds to the real obstacle.',
          },
          spark: {
            scenario:
              'Your friends are chatting in the car while the maps voice calmly says continue straight. The road looks closed, but nobody wants the vibe interrupted.',
            choices: [
              {
                id: 'keep-vibe',
                text: 'Keep the vibe and follow the calm app voice.',
                isBiased: true,
                outcomeLabel: 'You kept the vibe',
              },
              {
                id: 'call-it',
                text: 'Say the cones matter more than the voice and reroute.',
                isBiased: false,
                outcomeLabel: 'You called it out',
              },
              {
                id: 'ask-copilot',
                text: 'Ask a passenger to check another route while you stop safely.',
                isBiased: false,
                outcomeLabel: 'You used a copilot',
              },
            ],
            coachingLine:
              'Spark move: keeping the mood is easier when someone names the obvious signal.',
          },
          guardian: {
            scenario:
              'The app says continue, but the cones say closed. You do not want to annoy the cars behind you or make your passenger nervous.',
            choices: [
              {
                id: 'avoid-fuss',
                text: 'Follow the app to avoid causing a fuss.',
                isBiased: true,
                outcomeLabel: 'You avoided the fuss',
              },
              {
                id: 'safe-reroute',
                text: 'Signal, pull aside safely, and reroute around the closure.',
                isBiased: false,
                outcomeLabel: 'You rerouted safely',
              },
              {
                id: 'name-safety',
                text: 'Tell your passenger the visible road signs win over the app.',
                isBiased: false,
                outcomeLabel: 'You named the safety rule',
              },
            ],
            coachingLine:
              'Guardian move: protecting people sometimes means making the awkward safe choice.',
          },
          strategist: {
            scenario:
              'The app has traffic data, route logic, and a confident ETA. The physical cones are messy evidence, but they are also directly in front of you.',
            choices: [
              {
                id: 'trust-system',
                text: 'Trust the system because it has more data than you do.',
                isBiased: true,
                outcomeLabel: 'You trusted the system',
              },
              {
                id: 'weight-evidence',
                text: 'Give direct physical evidence priority and reroute.',
                isBiased: false,
                outcomeLabel: 'You weighted the evidence',
              },
              {
                id: 'manual-check',
                text: 'Check the route manually while stopped, then follow the open road.',
                isBiased: false,
                outcomeLabel: 'You checked manually',
              },
            ],
            coachingLine:
              'Strategist move: a model can be smart and still be stale.',
          },
        },
      },
      medium: {
        variantId: 'automation-medium',
        difficulty: 'medium',
        scenario:
          'You are reviewing a teammate\'s pull request. The repo\'s AI assistant flagged 0 issues. The diff is large, the deadline is today, and your eyes are tired.',
        choices: [
          {
            id: 'lgtm',
            text: 'Approve. The model would have caught anything serious.',
            isBiased: true,
            outcomeLabel: 'You approved on the model',
          },
          {
            id: 'read-diff',
            text: 'Read the diff section by section. The model does not replace the review.',
            isBiased: false,
            outcomeLabel: 'You read the diff',
          },
          {
            id: 'risk-sample',
            text: 'Sample-check the riskiest 30% (auth, data writes) even if you skim the rest.',
            isBiased: false,
            outcomeLabel: 'You sampled the risky parts',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'A subtle off-by-one made it to production. The AI tool was not trained on this codebase\'s invariants, so syntactically clean code passed without anyone reading it.',
            unbiased:
              'You found a quiet bug in the auth section. The AI had not flagged it because the pattern looked syntactically fine — the harm only made sense in context.',
          },
          biasExplanation:
            'Automation bias dresses up as efficiency. "The tool already checked it" feels like leverage, but a tool that finds nothing does not prove there is nothing to find — it only narrows what you actually looked for.',
          tip: 'Tools that find nothing do not prove there is nothing to find. Match your scrutiny to the change\'s blast radius.',
        },
      },
      hard: {
        variantId: 'automation-hard',
        difficulty: 'hard',
        scenario:
          'Your team\'s forecasting model has been more accurate than human estimates for six months. This quarter, it predicts a 22% revenue jump. Your conversations with customers tell a softer story.',
        choices: [
          {
            id: 'trust-track-record',
            text: 'Trust the model. Six months of evidence is solid.',
            isBiased: true,
            outcomeLabel: 'You trusted the track record',
          },
          {
            id: 'flag-divergence',
            text: 'Flag the divergence to leadership and treat both signals as data.',
            isBiased: false,
            outcomeLabel: 'You flagged the divergence',
          },
          {
            id: 'investigate-inputs',
            text: 'Investigate what the model is and is not seeing — recent contract changes? churn it cannot observe?',
            isBiased: false,
            outcomeLabel: 'You investigated the inputs',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'Q-end revenue came in flat. The model had not seen the new pricing tier or the recent enterprise churn — six months of accuracy did not transfer to a quarter where the inputs changed.',
            unbiased:
              'You found two inputs the model did not have, adjusted the forecast, and avoided a public miss.',
          },
          biasExplanation:
            'A model with a track record earns trust, not deference. Automation bias is hardest to spot when the system is genuinely good — your softer signal feels like noise next to its precision, even when the model is the one operating on stale inputs.',
          tip: 'A track record earns trust, not deference. When ground truth and a model diverge, find out why before picking a side.',
        },
      },
    },
  },
  {
    id: 'sunken-treasure-pit',
    title: 'Sunken Treasure Pit',
    bias: 'Sunk cost',
    roomIcon: 'COST',
    variants: {
      easy: {
        variantId: 'sunk-cost-easy',
        difficulty: 'easy',
        scenario:
          'You are 90 minutes into a movie you do not enjoy. You paid €15 for the ticket. Forty minutes still to go. Your friend whispers, "want to bail?".',
        choices: [
          {
            id: 'stay',
            text: 'Stay. You already paid, leaving wastes the money.',
            isBiased: true,
            outcomeLabel: 'You stayed',
          },
          {
            id: 'leave',
            text: 'Leave. The money is gone either way; reclaim your evening.',
            isBiased: false,
            outcomeLabel: 'You left',
          },
          {
            id: 'compromise',
            text: 'Stay 10 more minutes; if it is still bad, walk out.',
            isBiased: false,
            outcomeLabel: 'You set a stopping rule',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'You sat through 40 more minutes of a movie that did not get better. The €15 was already gone — now your evening was too.',
            unbiased:
              'You got 40 minutes of your evening back. The ticket money was spent either way; you stopped paying with time on top.',
          },
          biasExplanation:
            'Sunk cost is when you keep going because of what you already invested (money, time, effort), even though the future value is poor. The past spend is gone no matter what you do next.',
          tip: 'Decide based on what is still ahead, not what you have already spent. Ask "would I start this now from zero?"',
        },
        avatarOverrides: {
          explorer: {
            scenario:
              'You are 90 minutes into a bad movie and hate admitting a call did not pay off. Leaving feels like losing, but staying costs the rest of the evening.',
            choices: [
              {
                id: 'double-down',
                text: 'Double down and finish what you started.',
                isBiased: true,
                outcomeLabel: 'You doubled down',
              },
              {
                id: 'cut-loss',
                text: 'Leave now and spend the next 40 minutes better.',
                isBiased: false,
                outcomeLabel: 'You cut the loss',
              },
              {
                id: 'new-call',
                text: 'Make a fresh call based only on the time still ahead.',
                isBiased: false,
                outcomeLabel: 'You made a fresh call',
              },
            ],
            coachingLine:
              'Explorer move: changing course is still action when the mission changed.',
          },
          spark: {
            scenario:
              'The movie is bad, but the night out was supposed to be fun. You already bought snacks, joked about the trailer, and wanted this to become a good story.',
            choices: [
              {
                id: 'save-story',
                text: 'Stay and hope it turns into a fun story later.',
                isBiased: true,
                outcomeLabel: 'You tried to save the story',
              },
              {
                id: 'new-story',
                text: 'Leave and make the rest of the night the better story.',
                isBiased: false,
                outcomeLabel: 'You made a new story',
              },
              {
                id: 'check-friend',
                text: 'Ask your friend if the next 40 minutes are worth it from here.',
                isBiased: false,
                outcomeLabel: 'You checked the future',
              },
            ],
            coachingLine:
              'Spark move: the best story may start when you stop funding the bad one.',
          },
          guardian: {
            scenario:
              'Your friend picked the movie and paid for popcorn. You dislike it, but leaving feels rude because everyone already invested in the plan.',
            choices: [
              {
                id: 'stay-polite',
                text: 'Stay so nobody feels bad about the plan.',
                isBiased: true,
                outcomeLabel: 'You stayed polite',
              },
              {
                id: 'kind-exit',
                text: 'Suggest leaving kindly and doing something better together.',
                isBiased: false,
                outcomeLabel: 'You suggested a kind exit',
              },
              {
                id: 'future-value',
                text: 'Ask what would make the rest of the evening better for both of you.',
                isBiased: false,
                outcomeLabel: 'You focused on future value',
              },
            ],
            coachingLine:
              'Guardian move: protecting the evening can matter more than protecting the original plan.',
          },
          strategist: {
            scenario:
              'You paid €15 and have 40 minutes left. Part of your brain keeps calculating the ticket price, but the only live decision is how to spend the time ahead.',
            choices: [
              {
                id: 'finish-value',
                text: 'Finish it to get the full value of the ticket.',
                isBiased: true,
                outcomeLabel: 'You chased full value',
              },
              {
                id: 'ignore-sunk',
                text: 'Ignore the spent money and compare the next 40 minutes only.',
                isBiased: false,
                outcomeLabel: 'You ignored the sunk cost',
              },
              {
                id: 'zero-start',
                text: 'Ask whether you would choose this movie now if the ticket were free.',
                isBiased: false,
                outcomeLabel: 'You used a zero-start test',
              },
            ],
            coachingLine:
              'Strategist move: sunk costs are historical data, not decision criteria.',
          },
        },
      },
      medium: {
        variantId: 'sunk-cost-medium',
        difficulty: 'medium',
        scenario:
          'You are 14 months into a 24-month MBA you are paying for. You have started a venture that does not actually need the degree. Quitting now means losing €40k already paid; staying means another €40k and 10 months.',
        choices: [
          {
            id: 'finish-it',
            text: 'Finish what you started. You are already past halfway.',
            isBiased: true,
            outcomeLabel: 'You finished it out',
          },
          {
            id: 'next-only',
            text: 'Decide based only on whether the next 10 months and €40k beat the alternative.',
            isBiased: false,
            outcomeLabel: 'You weighed the next chapter',
          },
          {
            id: 'leave-of-absence',
            text: 'Audit which classes still help, and consider a leave of absence.',
            isBiased: false,
            outcomeLabel: 'You took an option',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'You spent another 10 months and €40k on coursework that did not move the venture. The first €40k was gone either way — you just paid the same again to feel finished.',
            unbiased:
              'You took a leave, kept the option to return, and put the next €40k into the venture.',
          },
          biasExplanation:
            'Sunk cost gets stronger as the investment grows. "Past halfway" feels like a milestone, but it is just a story your brain tells to justify spending more — the money already in does not change what the next €40k buys.',
          tip: 'Ask "if I were starting today with what I know now, would I sign up for the next 10 months and €40k?" That is the only live question.',
        },
      },
      hard: {
        variantId: 'sunk-cost-hard',
        difficulty: 'hard',
        scenario:
          'You have been at the same company 5 years. You are up for a senior promotion in 6 months — almost certain. A startup just offered you the role you wanted, today, with equity. The promotion would "validate" your time here.',
        choices: [
          {
            id: 'wait-promo',
            text: 'Wait 6 months. Five years is a lot to walk away from right before the title.',
            isBiased: true,
            outcomeLabel: 'You waited for the title',
          },
          {
            id: 'take-offer',
            text: 'Take the offer if the role and equity beat the next 6 months at your current company.',
            isBiased: false,
            outcomeLabel: 'You took the offer',
          },
          {
            id: 're-decide',
            text: 'Re-decide as if you joined the company yesterday — would you stay 6 more months for a title?',
            isBiased: false,
            outcomeLabel: 'You re-decided fresh',
          },
        ],
        reveal: {
          outcome: {
            biased:
              'You stayed for the title. The startup filled the role. Six months later, the new line on your resume felt smaller than the opportunity you passed on — and the five years still counted whether you stayed or not.',
            unbiased:
              'You took the new role. The five years still appear on your resume; the promotion turned out to be a sunk cost shaped like a future reward.',
          },
          biasExplanation:
            'The hardest sunk costs are the ones disguised as future payoffs. A promotion that "validates" past time is not new value — it is the past asking you to keep paying. The five years already happened either way.',
          tip: 'A future "validation" of past investment is a sunk cost in disguise. Decide on the next chapter, not the last one.',
        },
      },
    },
  },
]
