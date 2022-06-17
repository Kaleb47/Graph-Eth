import { Address } from "@graphprotocol/graph-ts";

import { Guess as GuessEvent } from "../types/CeaErc20/guessGame";
import { Guess } from "../types/schema";
import { addToken } from "./tokens";

export function handleGuess(event: GuessEvent): void {
    let transactionHash: string = event.transaction.hash.toHex();
    let guess = new Guess(transactionHash);
    guess.sender = event.params.from.toHex();
   
    guess.value = event.params.guessNumber;
    guess.save();
  
    let to: Address | null = event.transaction.to;
    if (to) {
      addToken(to.toHex());
    }
  }

