import Vue from "vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faAngleLeft, faAngleRight, faBookOpen, faHandPointUp, faTimes, faGripLines, faStream, faSnowplow } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleDown)
library.add(faAngleUp)
library.add(faAngleRight)
library.add(faAngleLeft)
library.add(faBookOpen)
library.add(faHandPointUp)
library.add(faTimes)
library.add(faGripLines)
library.add(faStream)
library.add(faSnowplow)

Vue.component('font-awesome-icon', FontAwesomeIcon)
