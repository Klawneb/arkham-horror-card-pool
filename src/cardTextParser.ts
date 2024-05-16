interface Icon {
    target: string,
    new: string
}

const icons: Icon[] = [
    {
        target: "\n",
        new: "<br/>"
    },
    {
        target: "[[",
        new: "<b>"
    },
    {
        target: "]]",
        new: "</b>"
    },
    {
        target: "[reaction]",
        new: "<span >" +
            "<img class='inline-block w-12 h-12' alt='reaction-icon' src='/reaction.svg'/>" +
            "</span>",
    },
    {
        target: "[willpower]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='willpower-icon' src='/willpower.svg'/>" +
            "</span>",
    },
    {
        target: "[intellect]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='intellect-icon' src='/intellect.svg'/>" +
            "</span>",
    },
    {
        target: "[combat]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='combat-icon' src='/combat.svg'/>" +
            "</span>",
    },
    {
        target: "[agility]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/agility.svg'/>" +
            "</span>",
    },
    {
        target: "[free]",
        new: "<span >" +
            "<img class='inline-block w-12 h-12' alt='agility-icon' src='/free.svg'/>" +
            "</span>",
    },
    {
        target: "[free]",
        new: "<span >" +
            "<img class='inline-block w-12 h-12' alt='agility-icon' src='/free.svg'/>" +
            "</span>",
    },
    {
        target: "[action]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/action.svg'/>" +
            "</span>",
    },
    {
        target: "[skull]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/skull.svg'/>" +
            "</span>",
    },
    {
        target: "[cultist]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/cultist.svg'/>" +
            "</span>",
    },
    {
        target: "[tablet]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/tablet.svg'/>" +
            "</span>",
    },
    {
        target: "[elder_thing]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/elderthing.svg'/>" +
            "</span>",
    },
    {
        target: "[auto_fail]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/autofail.svg'/>" +
            "</span>",
    },
    {
        target: "[elder_sign]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/eldersign.svg'/>" +
            "</span>",
    },
    {
        target: "[guardian]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/guardian.svg'/>" +
            "</span>",
    },
    {
        target: "[seeker]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/seeker.svg'/>" +
            "</span>",
    },
    {
        target: "[rogue]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/rogue.svg'/>" +
            "</span>",
    },
    {
        target: "[mystic]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/mystic.svg'/>" +
            "</span>",
    },
    {
        target: "[survivor]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/survivor.svg'/>" +
            "</span>",
    },
    {
        target: "[wild]",
        new: "<span >" +
            "<img class='inline-block w-8 h-8' alt='agility-icon' src='/wild.svg'/>" +
            "</span>",
    },
    {
        target: "[bless]",
        new: "<span >" +
            "<img class='inline-block w-10 h-10' alt='agility-icon' src='/bless.svg'/>" +
            "</span>",
    },
    {
        target: "[curse]",
        new: "<span >" +
            "<img class='inline-block w-10 h-10' alt='agility-icon' src='/curse.svg'/>" +
            "</span>",
    },
    {
        target: "[fast]",
        new: "<span >" +
            "<img class='inline-block w-12 h-12' alt='agility-icon' src='/free.svg'/>" +
            "</span>",
    },
    {
        target: "[per_investigator]",
        new: "<span >" +
            "<img class='inline-block w-7 h-7' alt='agility-icon' src='/investigator.svg'/>" +
            "</span>",
    },
]
export default function parseCardText(text: string) {
    let newText = text
    icons.forEach((icon) => {
        newText = newText.replaceAll(icon.target, icon.new);
    })
    return newText;
}