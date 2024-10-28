use anchor_lang::prelude::*;

mod state;
mod instructions;

use instructions::*;

declare_id!("6mgdkHJqFx5k8jhyiNs8PkfigeZ8CU6NdkUrsiytnE7g");

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
