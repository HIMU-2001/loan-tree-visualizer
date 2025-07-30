export type NodeType = 'account' | 'loan' | 'collateral';

export const ALLOWED_CHILDREN: Record<NodeType, NodeType[]> = {
  account: ['loan', 'collateral'],
  loan: ['collateral'],
  collateral: [],
};
