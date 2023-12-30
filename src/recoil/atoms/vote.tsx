import { atomFamily } from "recoil"

const voteAtoms = atomFamily({
  key: "vote-atoms",
  default: (id) => {
    return {
      id,
      value: 0,
    }
  },
})

export default voteAtoms
